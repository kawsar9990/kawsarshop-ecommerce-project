'use client'

import { useEffect, useState  } from "react"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from "@/src/context/AuthContext";
import { getUserReturnsHistoryAPI } from "@/src/services/returnServics";
import { 
  Package, Truck, ShieldCheck, CreditCard, XCircle, AlertTriangle,
  ArrowLeft, Calendar, HelpCircle, Loader2, AlertCircle, RefreshCw, CheckCircle2
} from 'lucide-react';



export default function page(){
const { id } = useParams(); 
const { token } = useAuth();
const [returnDetails, setReturnDetails] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(()=> {
 const fetchAndFilterReturn = async () =>{
  if (!token || token === 'null' || !id) return;

  window.scrollTo(0,0);
  
  try{
   setLoading(true);
   setError(null);
   const res = await getUserReturnsHistoryAPI(token);

   if(res && res.success){
    const allReturns = res.returns || [];
    const matchedReturn = allReturns.find(item => {
     const currentId = item._id?.$oid || item._id;
     return currentId === id;   
    });

    if(matchedReturn){
      setReturnDetails(matchedReturn); 
    } else{
       setError("Return request details not found in your profile history."); 
    }
   } else{
       setError("Failed to communicate with return management system."); 
    }

  }catch(error){
    console.error("Detail page data filtering error:", err.message);
    setError(err.message || "An error occurred while synchronizing tracking ledger.");
  }finally{
    setLoading(false);
  }
 }
 fetchAndFilterReturn();
}, [id, token])


if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] gap-3 bg-white rounded-3xl border border-gray-100 max-w-5xl mx-auto p-6 shadow-xl shadow-slate-100/40">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-12 h-12 rounded-full border-4 border-emerald-500/10 animate-ping" />
        <Loader2 className="animate-spin text-emerald-500" size={36} />
      </div>
      <p className="text-xs font-black tracking-widest uppercase text-slate-400 mt-2">Telemetry Syncing...</p>
    </div>
  );
}

if (error) {
return (
<div className="text-center py-16 bg-white rounded-3xl border border-rose-100 max-w-5xl mx-auto p-8 shadow-2xl shadow-rose-50/50 flex flex-col items-center justify-center gap-3">
  <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100 text-rose-500">
    <AlertCircle size={28} />
  </div>
  <p className="text-base font-black text-slate-800">{error}</p>
  <p className="text-xs text-gray-400 max-w-md leading-relaxed">The tracking subsystem was unable to securely map the dynamic URL parameter identifier against active collection pipelines.</p>
  <Link href="/profile/order-return" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-2.5 rounded-xl hover:opacity-95 shadow-md shadow-slate-800/10 transition-all">
    <ArrowLeft size={14} /> Return to Dashboard
  </Link>
</div>
);
}


const data = returnDetails || {};
const returnId = data._id?.$oid || data._id || 'N/A';
const orderId = data.orderId?.$oid || data.orderId || 'N/A';

const rawDate = data.createdAt?.$date || data.createdAt;
const createdAtFormatted = rawDate 
? new Date(rawDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) 
: 'N/A';

const currentStatus = data.status || 'Pending';
const isTerminated = currentStatus === 'Rejected' || currentStatus === 'Cancelled';
const isRefunded = currentStatus === 'Refunded';

const items = data.returnedItems || [];
const mainItem = items[0] || {};
const proofImages = data.images || [];

const price = Number(mainItem.price) || 0;
const qty = Number(mainItem.quantity) || 1;
const itemTotal = price * qty;
const shippingCost = Number(data.returnShippingCost) || 0;
const netRefund = Number(data.totalRefundIssued) || data.refundAmount || itemTotal;


const trackingMilestones = [
{ label: 'Filing Requested', key: 'Pending', subtitle: 'Awaiting Verification' },
{ label: 'Package In-Transit', key: 'In Transit', subtitle: 'Logistics Handshake' },
{ label: 'Quality Inspection', key: 'QC Processing', subtitle: 'Warehouse Validation' },
{ label: 'Refund Issued', key: 'Refunded', subtitle: 'Ledger Settled' }
];

const getTimelineActiveIndex = (status) => {
    switch(status){
      case 'Pending': return 0;
      case 'Drop-off': case 'Pick-up': case 'In Transit': case 'Package Received': return 1;
      case 'QC Processing': return 2;
      case 'Refunded': return 3;
      case 'Rejected': case 'Cancelled': return 2;
      default: return 0;
    }
};

const currentStepIndex = getTimelineActiveIndex(currentStatus);


return(
<div style={{userSelect: "none"}}>
<div className="max-w-5xl mx-auto p-2 md:p-6 bg-slate-50/50 rounded-3xl border border-slate-100/80 shadow-2xl shadow-slate-100/20 space-y-6">

<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-gray-100">
<div>

<Link href="/profile/order-return" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-black transition-colors mb-1.5 group">
<ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Return Summary
</Link>

<div className="flex flex-wrap items-center gap-2.5 mt-3 md:mt-1">
  <h2 className="text-[12px] md:text-2xl font-black text-slate-900 tracking-tight">Track Return Requst</h2>
  <span className={`text-[8px] md:text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-md border shadow-2xs ${
    isRefunded ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
    isTerminated ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' :
    'bg-amber-50 text-amber-600 border-amber-100 animate-pulse'
  }`}>
    {currentStatus}
  </span>
</div>
</div>

<div className="flex items-center gap-2 text-xs text-slate-600 font-bold bg-white px-3.5 py-2 rounded-xl border border-gray-100 shadow-sm">
  <Calendar size={14} className="text-[#E2136E]" />
  <span>Filing Date: {createdAtFormatted}</span>
</div>
</div>


 <div className="bg-white border border-gray-200/60 rounded-2xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
  <div className="pb-3 md:pb-0">
    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Return Reference Tracking</p>
    <h3 className="text-[13px] font-black text-slate-800 mt-1">#{returnId}</h3>
    <p className="text-[10px] text-gray-400 capitalize font-black tracking-widest mt-2">Order Id:</p>
    <h3 className="text-[11px] font-black text-slate-800 mt-1">#{orderId}</h3>
  </div>
  
  <div className="py-3 md:py-0 md:pl-6">
    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Collection Dispatch</p>
    <h3 className="text-md font-bold text-slate-800 mt-1 flex items-center gap-1.5">
      <Truck size={15} className="text-[#E2136E]" /> {data.returnMethod || 'DropOff'} Channels
    </h3>
    <p className="text-[11px] text-gray-400 mt-0.5">
    {data.returnMethod === 'PickUp' ? (
      <>Our logistics agent will securely retrieve the package from your <span className="text-[#E2136E] font-bold">Billing Address</span>.</>
    ) : (
      <>Kindly drop the verified parcel at your nearest matching <span className="text-slate-800 font-bold">Kawsarshop Hub</span> branch.</>
    )}
    </p>
  </div>


 <div className="pt-3 md:pt-0 md:pl-6 group/refund">
  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest transition-colors group-hover/refund:text-slate-600">
    Refund Status Estimate
  </p>
  
  <div className="flex items-center gap-2 mt-1">
    <span className={`relative flex h-2 w-2`}>
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
        isRefunded ? 'bg-emerald-400' : isTerminated ? 'bg-rose-400' : 'bg-amber-400'
      }`}></span>
      <span className={`relative inline-flex rounded-full h-2 w-2 ${
        isRefunded ? 'bg-emerald-500' : isTerminated ? 'bg-rose-500' : 'bg-amber-500'
      }`}></span>
    </span>

    <h3 className={`text-md font-black tracking-tight ${
      isRefunded ? 'text-emerald-600' : isTerminated ? 'text-rose-600' : 'text-amber-500'
    }`}>
      {isRefunded ? 'Balance Disbursed' : currentStatus === 'Rejected' ? 'Request Declined' : currentStatus === 'Cancelled' ? 'Request Voided' : 'Processing Settlement'}
    </h3>
  </div>

  <p className="text-[11px] text-slate-500/90 font-medium mt-1 leading-relaxed max-w-[240px]">
    {isRefunded ? (
      <>Fulfillment engine finalized. Capital securely routed back to your <span className="text-emerald-600 font-bold">Source Payment Gateway</span>.</>
    ) : isTerminated ? (
      <>Pipeline transaction halted. Gateway lock active due to <span className="text-rose-600 font-bold">Audit Non-Compliance</span>.</>
    ) : (
      <>Liquidation initiated. Standard clearance window: <span className="text-amber-600 font-bold">3-5 Banking Days</span>.</>
    )}
  </p>
</div>
</div>


<div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-xs relative overflow-hidden">
<div className="absolute right-0 top-0 w-24 h-24 bg-slate-50 rounded-bl-full -z-0 pointer-events-none flex justify-end p-4 items-start text-slate-200">
  <HelpCircle size={36} />
</div>

<h4 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-6 relative z-10">Return Processing Timeline</h4>

<div className="relative z-10 my-2">
<div className="absolute hidden md:block top-4.5 left-12 right-12 h-[3px] bg-slate-100 -z-10" />

<div
className={`absolute hidden md:block top-4.5 left-12 h-[3px] transition-all duration-500 -z-10 ${
  isRefunded ? 'bg-emerald-500' :
  isTerminated ? 'bg-gradient-to-r from-emerald-500 to-rose-500' : 
  'bg-gradient-to-r from-emerald-500 to-[#E2136E]'
}`} 
style={{ width: `${(currentStepIndex / 3) * 88}%` }}
/>

<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
{trackingMilestones.map((milestone, idx) => {
  const isPassed = idx <= currentStepIndex;
  const isCurrent = idx === currentStepIndex; 
  let circleClass = 'bg-white border-gray-200 text-gray-400';
  
  if(isCurrent){
    if(isTerminated){
        circleClass = 'bg-rose-600 border-rose-600 text-white ring-4 ring-rose-600/10 scale-105 shadow-md shadow-rose-600/25'; 
    } else if(isRefunded){
        circleClass = 'bg-emerald-500 border-emerald-500 text-white ring-4 ring-emerald-500/10 scale-105 shadow-md shadow-emerald-500/25';
    } else{
        circleClass = 'bg-[#E2136E] border-[#E2136E] text-white ring-4 ring-[#E2136E]/10 scale-105 shadow-md shadow-[#E2136E]/25';
    }
  } else if(isPassed){
    circleClass = 'bg-emerald-500 border-emerald-500 text-white';
  }

return(
<div key={idx} className="flex md:flex-col items-center flex-1 w-full text-left md:text-center relative">
<div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold transition-all duration-300 shadow-3xs ${circleClass}`}>
  {idx === 0 && (isCurrent && isTerminated ? <XCircle size={16} /> : <Package size={16} />)}
  {idx === 1 && (isCurrent && isTerminated ? <XCircle size={16} /> : <Truck size={16} />)}
  {idx === 2 && (isCurrent && isTerminated ? <XCircle size={16} /> : <ShieldCheck size={16} />)}
  {idx === 3 && (isRefunded ? <CheckCircle2 size={16} /> : <CreditCard size={16} />)}
</div>

<div className="ml-4 md:ml-0 mt-0 md:mt-3">
<p className={`text-xs font-black tracking-tight ${
  isCurrent ? (isTerminated ? 'text-rose-600' : isRefunded ? 'text-emerald-600' : 'text-[#E2136E]') : isPassed ? 'text-slate-800' : 'text-gray-400'
}`}>
  {isCurrent && isTerminated ? `${currentStatus} Node` : milestone.label}
</p>
<p className="text-[10px] text-gray-400 mt-0.5 max-w-[140px] leading-tight hidden md:block mx-auto">
  {isCurrent && isTerminated ? 'Pipeline Terminated Here' : isRefunded ? 'Payout Completed' : milestone.subtitle}
</p>
</div>
</div>   
);
})}
</div>
</div>

{isTerminated && (
<div className="mt-8 p-4.5 bg-gradient-to-r from-rose-50/70 to-rose-50/20 border border-rose-100 rounded-xl flex gap-3.5 text-rose-800 animate-fade-in">
<AlertTriangle size={20} className="mt-0.5 flex-shrink-0 text-rose-500" />
  <div className="space-y-1">
    <p className="text-[10px] md:text-sm font-black">Operational Compliance Desk Action Log</p>
    <p className="text-xs text-rose-600 font-medium leading-relaxed">
      This return request was intercepted and flagged as <b className="tracking-wide text-rose-700">{currentStatus}</b> by security or catalog moderators. 
    </p>
  </div>
</div>   
)}

{isRefunded && (
<div className="mt-8 p-4.5 bg-gradient-to-r from-emerald-50 to-emerald-50/20 border border-emerald-100 rounded-xl flex gap-3.5 text-emerald-800 animate-fade-in">
<CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-emerald-500" />
  <div className="space-y-1">
    <p className="text-[10px] md:text-sm font-black">Refund Disbursed Successfully!</p>
    <p className="text-xs text-emerald-600 font-medium leading-relaxed">
      The financial ledger transaction was finalized. The full net amount has been successfully routed back to your funding bank/wallet system.
    </p>
  </div>
</div>
)}
</div>



<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="lg:col-span-2 space-y-4">

<div className="bg-white border border-gray-200/60 rounded-2xl p-5 shadow-3xs flex flex-col sm:flex-row gap-4 items-start sm:items-center relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-[#E2136E]" />
<div className="w-20 h-20 bg-slate-50 border border-gray-100 p-1.5 rounded-xl flex-shrink-0 flex items-center justify-center">
<img src={mainItem.image} alt={mainItem.name || "product"} className="max-w-full max-h-full object-contain mix-blend-multiply" />
</div>
<div className="flex-1 space-y-1">
<span className="text-[9px] font-black text-[#E2136E] uppercase bg-rose-50 px-2 py-0.5 rounded-md tracking-wider border border-rose-100/30">
  {mainItem.category}
</span>
<h4 className="text-sm font-black text-slate-800 leading-snug line-clamp-1">{mainItem.name}</h4>
<p className="text-[11px] text-gray-400 font-mono tracking-tight">SKU: {mainItem.sku}</p>

<div className="flex gap-5 pt-1 text-xs text-slate-500 font-bold">
  <span>Unit Base: <b className="text-slate-800 font-mono">${price.toLocaleString()}</b></span>
  <span>Filing Quantity: <b className="text-slate-800 font-mono">{qty} Pcs</b></span>
</div>
</div>
</div>


{proofImages.length > 0 && (
  <div className="bg-white border border-gray-200/60 rounded-2xl p-5 shadow-3xs space-y-3">
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Vault Evidence Images ({proofImages.length})</p>
    <div className="flex items-center gap-3 overflow-x-auto pb-1">
      {proofImages.map((imgUrl, i) => (
        <a href={imgUrl} target="_blank" rel="noreferrer" key={i} className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shadow-3xs flex-shrink-0 relative group hover:border-[#E2136E] transition-all">
          <img src={imgUrl} alt={`proof-${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">Open</div>
        </a>
      ))}
    </div>
  </div>
)}
</div>

<div className="lg:col-span-1 bg-white border border-gray-200/60 rounded-2xl p-5 shadow-3xs flex flex-col justify-between space-y-6 relative overflow-hidden">
      <div className="space-y-4">
        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Financial Audit Ledger</h5> 
        <div className="space-y-3 text-xs">
          <div className="flex justify-between text-slate-500 font-bold">
            <span>Items Multiplier Base ({qty} x ${price})</span>
            <span className="font-mono font-black text-slate-800">${itemTotal.toLocaleString()}</span>
          </div>
      <div className="flex justify-between text-slate-500 font-bold">
        <span>Return Logistics Service Fee</span>
        <span className="font-mono font-black text-rose-500">-${shippingCost.toLocaleString()}</span>
      </div>
      <div className="p-2.5 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Filing Return Motive</p>
        <p className="text-[11px] text-slate-700 italic leading-relaxed font-medium">"{data.reason || 'None stated'}"</p>
      </div>
    </div>
  </div>
  <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-end">
    <div>
      <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Total Refund Disbursed</p>
      <p className="text-[10px] text-emerald-600 font-black mt-0.5 flex items-center gap-1">
        <RefreshCw size={10} className="animate-spin-slow" /> Net Liquid Liquidation
      </p>
    </div>
    <span className="text-2xl font-mono font-black text-emerald-600 tracking-tight">${netRefund.toLocaleString()}</span>
  </div>
</div>

</div>



</div>
</div>
)

}