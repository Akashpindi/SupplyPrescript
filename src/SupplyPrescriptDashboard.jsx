import React, { useState, useMemo, useEffect } from 'react';
import { 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Package, 
  History, 
  BarChart3, 
  LayoutDashboard,
  Loader2,
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  CheckCircle2,
  Sliders,
  ShieldAlert,
  Layers,
  FileText,
  ChevronRight,
  Play,
  X,
  TrendingUp,
  PieChart as PieIcon,
  IndianRupee,
  Check,
  Bell,
  Clock,
  User,
  Plus,
  Compass,
  Zap,
  Globe,
  SlidersHorizontal,
  Copy,
  ExternalLink,
  Info
} from 'lucide-react';
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';

// --- MOCK DATASETS (INR CURRENCY) ---
const initialAnalyticsData = {
  '7D': [
    { name: 'Fix 1', predicted: 1200000, actual: 1150000, accuracy: 95.8 },
    { name: 'Fix 2', predicted: 450000, actual: 520000, accuracy: 84.4 },
    { name: 'Fix 3', predicted: 1500000, actual: 1500000, accuracy: 100.0 },
  ],
  '30D': [
    { name: 'Fix 1', predicted: 1200000, actual: 1150000, accuracy: 95.8 },
    { name: 'Fix 2', predicted: 450000, actual: 520000, accuracy: 84.4 },
    { name: 'Fix 3', predicted: 1500000, actual: 1500000, accuracy: 100.0 },
    { name: 'Fix 4', predicted: 800000, actual: 950000, accuracy: 81.2 },
    { name: 'Fix 5', predicted: 2800000, actual: 2750000, accuracy: 98.2 },
  ],
  '90D': [
    { name: 'Fix 1', predicted: 1200000, actual: 1150000, accuracy: 95.8 },
    { name: 'Fix 2', predicted: 450000, actual: 520000, accuracy: 84.4 },
    { name: 'Fix 3', predicted: 1500000, actual: 1500000, accuracy: 100.0 },
    { name: 'Fix 4', predicted: 800000, actual: 950000, accuracy: 81.2 },
    { name: 'Fix 5', predicted: 2800000, actual: 2750000, accuracy: 98.2 },
    { name: 'Fix 6', predicted: 1500000, actual: 1800000, accuracy: 80.0 }, 
  ]
};

const timelineDataMap = {
  '7D': [
    { month: 'Day 1', capitalSaved: 620000, modelAccuracy: 92.2, decisions: 4 },
    { month: 'Day 3', capitalSaved: 1150000, modelAccuracy: 91.5, decisions: 8 },
    { month: 'Day 5', capitalSaved: 1840000, modelAccuracy: 93.0, decisions: 12 },
    { month: 'Day 7', capitalSaved: 2450000, modelAccuracy: 94.1, decisions: 15 },
  ],
  '30D': [
    { month: 'Week 1', capitalSaved: 1200000, modelAccuracy: 89.2, decisions: 18 },
    { month: 'Week 2', capitalSaved: 2100000, modelAccuracy: 90.5, decisions: 25 },
    { month: 'Week 3', capitalSaved: 3400000, modelAccuracy: 91.8, decisions: 33 },
    { month: 'Week 4', capitalSaved: 4820000, modelAccuracy: 92.4, decisions: 42 },
  ],
  '90D': [
    { month: 'Jan', capitalSaved: 1200000, modelAccuracy: 89.2, decisions: 18 },
    { month: 'Feb', capitalSaved: 1850000, modelAccuracy: 90.5, decisions: 24 },
    { month: 'Mar', capitalSaved: 2400000, modelAccuracy: 91.0, decisions: 29 },
    { month: 'Apr', capitalSaved: 3100000, modelAccuracy: 90.8, decisions: 32 },
    { month: 'May', capitalSaved: 3950000, modelAccuracy: 92.1, decisions: 38 },
    { month: 'Jun', capitalSaved: 4820000, modelAccuracy: 91.4, decisions: 41 },
  ]
};

const categoryDistribution = [
  { name: 'Air Freight Overrides', value: 42, color: '#3b82f6' },
  { name: 'Secondary Supplier Pivots', value: 35, color: '#10b981' },
  { name: 'Rail Logistics Pivots', value: 15, color: '#f59e0b' },
  { name: 'Absorb & Delay', value: 8, color: '#ef4444' },
];

const initialHistoryLog = [
  { id: 101, date: '2026.08.01', event: 'Microchip Delays #302', action: 'Option A: Air Freight Override', predicted: '₹15,00,000', actual: '₹18,00,000', outcome: 'OVER BUDGET', discrepancy: '+₹3,00,000', modelConf: '94.2%', operator: 'Dr. A. Sharma', origin: 'Taiwan (TPE)', SKU: 'SKU-8849-MC', route: 'Air Transit Express' },
  { id: 102, date: '2026.07.14', event: 'Port Congestion (BOM)', action: 'Option B: Rail Logistics Pivot', predicted: '₹12,40,000', actual: '₹11,80,000', outcome: 'PROFITABLE', discrepancy: '-₹60,000', modelConf: '91.8%', operator: 'R. Patel', origin: 'Nhava Sheva', SKU: 'SKU-3320-SL', route: 'Freight Corridor Rail' },
  { id: 103, date: '2026.06.28', event: 'Supplier Default Exception', action: 'Activate Spot Buy Protocol', predicted: '₹4,20,000', actual: '₹5,10,000', outcome: 'OVER BUDGET', discrepancy: '+₹90,000', modelConf: '88.5%', operator: 'M. Iyer', origin: 'Chennai Hub', SKU: 'SKU-1102-SB', route: 'Local Trucking' },
  { id: 104, date: '2026.05.15', event: 'Weather Delay (Typhoon)', action: 'Air Freight Premium Charter', predicted: '₹28,00,000', actual: '₹27,50,000', outcome: 'PROFITABLE', discrepancy: '-₹50,000', modelConf: '96.0%', operator: 'Dr. A. Sharma', origin: 'Shenzhen (SZX)', SKU: 'SKU-9941-PC', route: 'Direct Air Cargo' },
  { id: 105, date: '2026.04.10', event: 'Customs Clearance Hold (BOM)', action: 'Priority Express Transit', predicted: '₹8,50,000', actual: '₹8,20,000', outcome: 'PROFITABLE', discrepancy: '-₹30,000', modelConf: '93.5%', operator: 'K. Verma', origin: 'Mumbai Inland', SKU: 'SKU-4412-CC', route: 'Express Clearance' },
  { id: 106, date: '2026.03.22', event: 'Semiconductor Yield Loss', action: 'Secondary Fab Allocation', predicted: '₹19,00,000', actual: '₹19,50,000', outcome: 'OVER BUDGET', discrepancy: '+₹50,000', modelConf: '90.1%', operator: 'R. Patel', origin: 'Bengaluru Fab', SKU: 'SKU-7729-SF', route: 'Dedicated Transport' },
  { id: 107, date: '2026.02.18', event: 'Raw Polymer Shortage', action: 'Alternative Material Spec', predicted: '₹6,40,000', actual: '₹5,90,000', outcome: 'PROFITABLE', discrepancy: '-₹50,000', modelConf: '92.4%', operator: 'M. Iyer', origin: 'Gujarat Plant', SKU: 'SKU-5501-RP', route: 'Pipeline Rail' },
];

const initialDisruptionScenarios = [
  {
    id: 'disruption-1',
    title: 'Microchip Shipment #4092 Delay',
    severity: 'CRITICAL',
    impactDays: 14,
    affectedProduct: 'Smart IoT Gateway v4',
    riskLevel: 'HIGH',
    originPort: 'Hsinchu, Taiwan',
    supplier: 'TSMC Advanced Logistics',
    rootCause: 'Silicon Substrate Shortage & Flight Bottleneck',
    options: [
      { id: 'A', title: 'Air Freight Override', label: 'Option A', baseCost: 1500000, baseDelay: 0, risk: 'LOW RISK', riskColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
      { id: 'B', title: 'Secondary Supplier Pivot', label: 'Option B', baseCost: 840000, baseDelay: 3, risk: 'MED RISK', riskColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
      { id: 'C', title: 'Absorb & Delay Launch', label: 'Option C', baseCost: 0, baseDelay: 14, risk: 'HIGH RISK', riskColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20' }
    ]
  },
  {
    id: 'disruption-2',
    title: 'Nhava Sheva Port Congestion',
    severity: 'HIGH',
    impactDays: 6,
    affectedProduct: 'Solar Inverter Control Boards',
    riskLevel: 'MEDIUM',
    originPort: 'Mumbai (JNPT)',
    supplier: 'Gateway Terminals India',
    rootCause: 'Monsoon Berth Backlog & Crane Maintenance',
    options: [
      { id: 'A', title: 'Multimodal Rail-Road Bypass', label: 'Option A', baseCost: 450000, baseDelay: 1, risk: 'LOW RISK', riskColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
      { id: 'B', title: 'Alternate Port Reroute (Mundra)', label: 'Option B', baseCost: 720000, baseDelay: 2, risk: 'MED RISK', riskColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
      { id: 'C', title: 'Wait in Anchor Queue', label: 'Option C', baseCost: 0, baseDelay: 6, risk: 'HIGH RISK', riskColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20' }
    ]
  },
  {
    id: 'disruption-3',
    title: 'Raw Copper Wire Stockout',
    severity: 'MEDIUM',
    impactDays: 4,
    affectedProduct: 'High-Voltage Transformer Cores',
    riskLevel: 'MEDIUM',
    originPort: 'Jharsuguda Smelter',
    supplier: 'Hindalco Industrial Corp',
    rootCause: 'Power Grid Load Shedding at Smelter',
    options: [
      { id: 'A', title: 'Domestic Spot Market Purchase', label: 'Option A', baseCost: 320000, baseDelay: 0.5, risk: 'LOW RISK', riskColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
      { id: 'B', title: 'Substitute Alloy Approval', label: 'Option B', baseCost: 180000, baseDelay: 2, risk: 'MED RISK', riskColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20' }
    ]
  }
];

const MetricCard = ({ title, value, subValue, trend, icon: Icon, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-zinc-700 hover:shadow-xl hover:shadow-emerald-950/10 transition-all duration-300 ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-emerald-500/10 transition-all" />
    <div className="flex justify-between items-start mb-3">
      <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
      {Icon && <Icon className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />}
    </div>
    <div className="flex items-baseline gap-3">
      <h3 className="text-2xl lg:text-3xl font-black text-white font-mono tracking-tight">{value}</h3>
      {subValue && (
        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border ${trend === 'up' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-rose-400 bg-rose-400/10 border-rose-400/20'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {subValue}
        </span>
      )}
    </div>
  </div>
);

const DecisionCard = ({ option, onExecute, computedCost, computedDelay }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onExecute({ ...option, cost: computedCost, delay: computedDelay });
    }, 1000);
  };

  return (
    <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800/90 p-6 rounded-2xl flex flex-col h-full relative overflow-hidden group hover:border-emerald-500/40 hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1 block">{option.label}</span>
          <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{option.title}</h4>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${option.riskColor}`}>
          {option.risk}
        </span>
      </div>

      <div className="space-y-4 mb-8 flex-grow">
        <div className="flex justify-between items-center text-sm border-b border-zinc-800/80 pb-3">
          <span className="text-zinc-400">Cost Impact</span>
          <span className="text-emerald-400 font-mono font-bold">{computedCost}</span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-zinc-800/80 pb-3">
          <span className="text-zinc-400">Delay Impact</span>
          <span className="text-white font-mono font-medium">{computedDelay}</span>
        </div>
      </div>

      <button 
        onClick={handleClick}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-zinc-100 to-white hover:from-emerald-400 hover:to-emerald-300 text-zinc-950 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer text-sm shadow-md hover:shadow-emerald-500/20 active:scale-[0.98]"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin text-zinc-950" /> : 'EXECUTE DECISION'}
      </button>
    </div>
  );
};

export default function SupplyPrescriptDashboard() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'action' | 'analytics' | 'history'

  // Time & Realtime Clock State
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Datasets State
  const [disruptions, setDisruptions] = useState(initialDisruptionScenarios);
  const [selectedDisruption, setSelectedDisruption] = useState(initialDisruptionScenarios[0]);
  const [history, setHistory] = useState(initialHistoryLog);
  const [timeRange, setTimeRange] = useState('90D'); // '7D' | '30D' | '90D'

  // Modal & Drawer State
  const [showConfirm, setShowConfirm] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [inspectionTab, setInspectionTab] = useState('summary'); // 'summary' | 'json'
  const [showDrawer, setShowDrawer] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Action Engine Sliders State
  const [bufferInventory, setBufferInventory] = useState(45);
  const [airFreightCap, setAirFreightCap] = useState(80);
  const [expeditedBudget, setExpeditedBudget] = useState(1500000);

  // History Log Filters
  const [historySearch, setHistorySearch] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState('ALL');
  const [historySort, setHistorySort] = useState('date-desc');

  // Custom Scenario Form State
  const [newTitle, setNewTitle] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [newSeverity, setNewSeverity] = useState('HIGH');
  const [newImpactDays, setNewImpactDays] = useState(7);
  const [newSupplier, setNewSupplier] = useState('');

  // Keyboard Shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Trigger Toast Notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Confirm Decision Write-back
  const handleConfirmWriteBack = () => {
    if (showConfirm) {
      const newRecord = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        event: selectedDisruption ? selectedDisruption.title : 'Manual Prescriptive Override',
        action: showConfirm.title,
        predicted: showConfirm.cost,
        actual: showConfirm.cost,
        outcome: 'PROFITABLE',
        discrepancy: '₹0 (Verified)',
        modelConf: '96.2%',
        operator: 'Operations Lead (Member 4)',
        origin: selectedDisruption ? selectedDisruption.originPort : 'Inland Logistics',
        SKU: 'SKU-PRESCRIPT-LIVE',
        route: 'Autonomous Pipeline Override'
      };
      setHistory([newRecord, ...history]);
      triggerToast(`Successfully executed ${showConfirm.title}. Operational database override logged.`);
      setShowConfirm(null);
    }
  };

  // Add Custom Disruption Scenario
  const handleCreateDisruption = (e) => {
    e.preventDefault();
    if (!newTitle || !newProduct) return;

    const customScenario = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      severity: newSeverity,
      impactDays: Number(newImpactDays),
      affectedProduct: newProduct,
      riskLevel: newSeverity === 'CRITICAL' ? 'HIGH' : 'MEDIUM',
      originPort: 'Domestic Hub',
      supplier: newSupplier || 'Primary Logistics Partner',
      rootCause: 'Operator Simulated Disruption',
      options: [
        { id: 'A', title: 'Air Freight Override', label: 'Option A', baseCost: 1200000, baseDelay: 0, risk: 'LOW RISK', riskColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
        { id: 'B', title: 'Secondary Supplier Pivot', label: 'Option B', baseCost: 600000, baseDelay: 2, risk: 'MED RISK', riskColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
        { id: 'C', title: 'Absorb & Delay Launch', label: 'Option C', baseCost: 0, baseDelay: Number(newImpactDays), risk: 'HIGH RISK', riskColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20' }
      ]
    };

    setDisruptions([customScenario, ...disruptions]);
    setSelectedDisruption(customScenario);
    setShowCreateModal(false);
    setNewTitle('');
    setNewProduct('');
    setNewSupplier('');
    triggerToast(`Created new disruption scenario: ${newTitle}`);
  };

  // Dynamic Option Calculation based on Sliders
  const computeOptionCostAndDelay = (opt) => {
    if (opt.id === 'C') {
      return { cost: '₹0 Direct Capital', delay: `Severe (${selectedDisruption.impactDays} Days)` };
    }
    const bufferFactor = (100 - bufferInventory) / 100;
    const airCapFactor = airFreightCap / 100;
    const budgetFactor = expeditedBudget / 1500000;

    let adjustedCost = Math.round(opt.baseCost * bufferFactor * budgetFactor);
    let adjustedDelay = Math.max(0, Math.round(opt.baseDelay * (1 - airCapFactor * 0.4)));

    const formattedCost = adjustedCost === 0 ? '₹0 Direct Capital' : `+₹${adjustedCost.toLocaleString('en-IN')}`;
    const formattedDelay = adjustedDelay === 0 ? 'Instant (0 Days)' : `Reduced (${adjustedDelay} Days)`;

    return { cost: formattedCost, delay: formattedDelay };
  };

  // Filtered & Sorted History Log
  const filteredHistory = useMemo(() => {
    let result = history.filter((item) => {
      const matchesSearch = 
        item.event.toLowerCase().includes(historySearch.toLowerCase()) ||
        item.action.toLowerCase().includes(historySearch.toLowerCase()) ||
        item.operator.toLowerCase().includes(historySearch.toLowerCase()) ||
        item.SKU.toLowerCase().includes(historySearch.toLowerCase());
      const matchesOutcome = outcomeFilter === 'ALL' || item.outcome === outcomeFilter;
      return matchesSearch && matchesOutcome;
    });

    return result.sort((a, b) => {
      if (historySort === 'date-desc') return b.date.localeCompare(a.date);
      if (historySort === 'date-asc') return a.date.localeCompare(b.date);
      if (historySort === 'id-desc') return b.id - a.id;
      return 0;
    });
  }, [historySearch, outcomeFilter, historySort, history]);

  // Global Search Modal Results
  const globalSearchResults = useMemo(() => {
    if (!globalSearch.trim()) return [];
    const q = globalSearch.toLowerCase();
    const matches = [];

    disruptions.forEach(d => {
      if (d.title.toLowerCase().includes(q) || d.affectedProduct.toLowerCase().includes(q)) {
        matches.push({ type: 'Disruption', title: d.title, sub: d.affectedProduct, action: () => { setSelectedDisruption(d); setActiveTab('action'); setShowSearchModal(false); } });
      }
    });

    history.forEach(h => {
      if (h.event.toLowerCase().includes(q) || h.action.toLowerCase().includes(q)) {
        matches.push({ type: 'Audit Record', title: h.event, sub: h.action, action: () => { setSelectedHistoryItem(h); setActiveTab('history'); setShowSearchModal(false); } });
      }
    });

    return matches.slice(0, 5);
  }, [globalSearch, disruptions, history]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans pl-0 lg:pl-64 flex flex-col selection:bg-emerald-500 selection:text-black">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-zinc-900 border border-emerald-500/60 text-emerald-300 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce backdrop-blur-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* GLOBAL SEARCH MODAL (CTRL+K) */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-zinc-500" />
              <input 
                type="text"
                autoFocus
                placeholder="Search disruptions, SKU IDs, or audit records..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none"
              />
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded">ESC</span>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto">
              {globalSearchResults.length > 0 ? (
                globalSearchResults.map((res, i) => (
                  <div 
                    key={i}
                    onClick={res.action}
                    className="p-3 hover:bg-zinc-800/80 rounded-xl cursor-pointer transition-colors flex justify-between items-center"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">{res.type}</span>
                      <span className="text-sm font-bold text-white block">{res.title}</span>
                      <span className="text-xs text-zinc-400">{res.sub}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-zinc-500 text-xs font-mono">
                  {globalSearch ? 'No matching records found' : 'Type to search across operations...'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DISRUPTION INTELLIGENCE DRAWER */}
      {showDrawer && selectedDisruption && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-zinc-950 border-l border-zinc-800 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">Disruption Intelligence Panel</h3>
                </div>
                <button onClick={() => setShowDrawer(false)} className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block mb-1">{selectedDisruption.severity} DISRUPTION</span>
                  <h2 className="text-2xl font-black text-white">{selectedDisruption.title}</h2>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 block mb-1 text-[10px]">AFFECTED PRODUCT</span>
                    <span className="text-white font-bold">{selectedDisruption.affectedProduct}</span>
                  </div>
                  <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 block mb-1 text-[10px]">ORIGIN PORT / HUB</span>
                    <span className="text-emerald-400 font-bold">{selectedDisruption.originPort}</span>
                  </div>
                  <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 block mb-1 text-[10px]">LOGISTICS PARTNER</span>
                    <span className="text-zinc-300 font-bold">{selectedDisruption.supplier}</span>
                  </div>
                  <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 block mb-1 text-[10px]">ESTIMATED DELAY</span>
                    <span className="text-rose-400 font-bold">{selectedDisruption.impactDays} Days</span>
                  </div>
                </div>

                <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-400" /> Root Cause Diagnosis
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono">{selectedDisruption.rootCause}</p>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Recommended Action
                  </h4>
                  <p className="text-xs text-zinc-300">
                    Execute <span className="text-white font-bold">Option A (Air Freight Override)</span> to achieve 0-day delay and save an estimated <span className="text-emerald-400 font-bold">₹14.2 Lakhs</span> in downstream manufacturing downtime.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-900 flex gap-3">
              <button 
                onClick={() => { setShowDrawer(false); setActiveTab('action'); }} 
                className="w-full py-3 bg-white hover:bg-zinc-100 text-black font-bold rounded-xl text-xs transition-colors shadow-md cursor-pointer"
              >
                Launch Prescriptive Action Engine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE CUSTOM DISRUPTION MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" /> Simulate Custom Disruption
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateDisruption} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1 font-semibold">Disruption Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Sub-assembly Factory Strike #808"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1 font-semibold">Affected Product Line</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. EV Inverter Controller"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1 font-semibold">Severity Tier</label>
                  <select 
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:outline-none"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1 font-semibold">Impact (Days)</label>
                  <input 
                    type="number" 
                    min="1"
                    max="60"
                    value={newImpactDays}
                    onChange={(e) => setNewImpactDays(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-zinc-400 block mb-1 font-semibold">Logistics Supplier Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Global Cargo Logistics"
                  value={newSupplier}
                  onChange={(e) => setNewSupplier(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-3 border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-800">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-100 shadow-md">
                  Inject Scenario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM ACTION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-amber-400" />
              <h3 className="text-2xl font-bold text-white">Confirm Write-Back</h3>
            </div>
            <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
              Are you sure you want to execute <span className="text-white font-bold">{showConfirm.title}</span>? This will instantly trigger an operational database override.
            </p>
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl mb-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Option Code:</span>
                <span className="text-white font-bold">{showConfirm.label}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Cost Impact:</span>
                <span className="text-emerald-400 font-bold">{showConfirm.cost}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Delay Impact:</span>
                <span className="text-white font-bold">{showConfirm.delay}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirm(null)} 
                className="flex-1 py-3 border border-zinc-800 hover:bg-zinc-800 text-white font-bold rounded-xl transition-colors cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmWriteBack} 
                className="flex-1 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl transition-colors cursor-pointer text-sm shadow-md"
              >
                Confirm Write-Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL FOR HISTORY */}
      {selectedHistoryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-lg w-full shadow-2xl relative">
            <button 
              onClick={() => setSelectedHistoryItem(null)} 
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-4 border-b border-zinc-800 pb-4">
              <FileText className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="text-xl font-bold text-white">{selectedHistoryItem.event}</h3>
                <p className="text-xs text-zinc-500 font-mono">Audit ID: #{selectedHistoryItem.id} | {selectedHistoryItem.date}</p>
              </div>
            </div>

            {/* TAB SWITCHER IN MODAL */}
            <div className="flex gap-2 mb-4 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
              <button 
                onClick={() => setInspectionTab('summary')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${inspectionTab === 'summary' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
              >
                Audit Summary
              </button>
              <button 
                onClick={() => setInspectionTab('json')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${inspectionTab === 'json' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
              >
                Raw JSON Log
              </button>
            </div>

            {inspectionTab === 'summary' ? (
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  <div>
                    <span className="text-zinc-500 text-xs block mb-1">Prescriptive Action</span>
                    <span className="text-white font-semibold">{selectedHistoryItem.action}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-xs block mb-1">Outcome Status</span>
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${selectedHistoryItem.outcome === 'PROFITABLE' ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' : 'text-rose-400 bg-rose-400/10 border border-rose-400/20'}`}>
                      {selectedHistoryItem.outcome}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 block mb-1">Predicted</span>
                    <span className="text-zinc-300 font-bold">{selectedHistoryItem.predicted}</span>
                  </div>
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 block mb-1">Actual</span>
                    <span className="text-white font-bold">{selectedHistoryItem.actual}</span>
                  </div>
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 block mb-1">Variance</span>
                    <span className={selectedHistoryItem.outcome === 'PROFITABLE' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {selectedHistoryItem.discrepancy}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>SKU Identifier:</span>
                    <span className="text-white">{selectedHistoryItem.SKU}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Origin Node:</span>
                    <span className="text-emerald-400">{selectedHistoryItem.origin}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>ML Confidence Score:</span>
                    <span className="text-white">{selectedHistoryItem.modelConf}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Authorized Operator:</span>
                    <span className="text-white">{selectedHistoryItem.operator}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-[11px] font-mono text-emerald-400 space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2 text-zinc-500">
                  <span>audit_payload.json</span>
                  <button 
                    onClick={() => { navigator.clipboard.writeText(JSON.stringify(selectedHistoryItem, null, 2)); triggerToast("JSON payload copied to clipboard"); }}
                    className="hover:text-white flex items-center gap-1 text-[10px]"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <pre className="overflow-x-auto max-h-48 whitespace-pre-wrap leading-relaxed text-zinc-300">
                  {JSON.stringify(selectedHistoryItem, null, 2)}
                </pre>
              </div>
            )}

            <button 
              onClick={() => setSelectedHistoryItem(null)} 
              className="w-full mt-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Dismiss Audit Window
            </button>
          </div>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-zinc-950 border-r border-zinc-900/80 hidden lg:flex flex-col p-6 z-40">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-emerald-500 to-emerald-300 rounded-xl flex items-center justify-center font-black text-black text-base shadow-lg shadow-emerald-500/20">
              SP
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-white">SupplyPrescript</h1>
              <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-[0.25em]">Closed-Loop Core</p>
            </div>
          </div>
        </div>
        
        {/* QUICK SEARCH TRIGGER */}
        <button 
          onClick={() => setShowSearchModal(true)}
          className="mb-6 w-full py-2.5 px-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-xl text-xs text-zinc-400 flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span>Quick Search...</span>
          </div>
          <kbd className="text-[9px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">⌘K</kbd>
        </button>

        <nav className="flex-grow space-y-1.5">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
            { id: 'action', name: 'Action Engine', icon: Activity, badge: disruptions.length },
            { id: 'analytics', name: 'Analytics Suite', icon: BarChart3 },
            { id: 'history', name: 'History Logs', icon: History, badge: filteredHistory.length },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${isActive ? 'bg-gradient-to-r from-zinc-900 to-zinc-850 text-white shadow-lg border border-zinc-700/80' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                  {item.name}
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-400 text-zinc-950 font-black' : 'bg-zinc-800 text-zinc-400'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* USER & SYSTEM FOOTER */}
        <div className="mt-auto pt-6 border-t border-zinc-900 space-y-3">
          <div className="flex items-center gap-3 p-2 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-white text-xs border border-zinc-700">
              M4
            </div>
            <div className="overflow-hidden text-left">
              <p className="text-xs font-bold text-white truncate">Operations Lead</p>
              <p className="text-[10px] text-zinc-500 truncate">Member 4 (Active)</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>12ms Latency</span>
            </div>
            <span>v2026.1.4</span>
          </div>
        </div>
      </aside>

      {/* TOP HEADER BAR FOR DESKTOP & MOBILE */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest hidden sm:inline">
            Prescriptive Ops /
          </span>
          <span className="text-xs font-bold text-white capitalize bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
            {activeTab} Mode
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currentTime || '11:30:00 PM'} IST</span>
          </div>

          <button 
            onClick={() => triggerToast("System Alert: Disruption #4092 active")}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 w-full flex-grow">
        
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* HEADER TITLE */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white">Operations Control Center</h2>
                <p className="text-zinc-400 text-xs mt-1">Closed-Loop Autonomous Prescriptive Engine (INR Realtime)</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Inject Disruption
                </button>
              </div>
            </div>

            {/* LIVE ALERT BANNER */}
            <div className="bg-rose-950/40 border border-rose-900/80 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-rose-500 text-black rounded font-mono">LIVE CRITICAL</span>
                    <span className="text-xs text-rose-300 font-bold">XGBoost ML Confidence: 94.2%</span>
                  </div>
                  <p className="text-zinc-200 text-xs font-semibold leading-relaxed">
                    Forecasting indicates an impending <span className="text-white font-bold underline decoration-rose-500">14-day delay</span> on Microchip Shipment #4092 (Hsinchu Hub). Action required to prevent factory line shutdown.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowDrawer(true)}
                  className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  Inspect Intelligence
                </button>
                <button 
                  onClick={() => setActiveTab('action')} 
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  Resolve Disruption <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PRESCRIPTIVE ACTION RECOMMENDATIONS */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald-400" /> Prescriptive Action Engine Recommendations
                </h3>
                <button 
                  onClick={() => setActiveTab('action')} 
                  className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  Launch Full Engine <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedDisruption.options.map((opt) => {
                  const computed = computeOptionCostAndDelay(opt);
                  return (
                    <DecisionCard 
                      key={opt.id} 
                      option={opt} 
                      computedCost={computed.cost} 
                      computedDelay={computed.delay} 
                      onExecute={(o) => setShowConfirm(o)} 
                    />
                  );
                })}
              </div>
            </div>

            {/* CLOSED-LOOP METRICS & CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-4 lg:col-span-1">
                <h3 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-zinc-400" /> Closed-Loop System Metrics
                </h3>
                <div className="space-y-4">
                  <MetricCard title="Total Decisions Executed" value="142" subValue="+12%" trend="up" icon={Cpu} onClick={() => setActiveTab('history')} />
                  <MetricCard title="Net Capital Saved (INR)" value="₹48,20,000" subValue="+₹3.4L" trend="up" icon={IndianRupee} onClick={() => setActiveTab('analytics')} />
                  <MetricCard title="ML Predictive Accuracy" value="91.4%" subValue="-0.2%" trend="down" icon={TrendingUp} onClick={() => setActiveTab('analytics')} />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold tracking-tight text-white">Cost Realization Discrepancies (INR)</h3>
                  <span className="text-xs text-zinc-500 font-mono">Predicted vs Actual Costs</span>
                </div>
                <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl h-[320px] shadow-xl">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={initialAnalyticsData['90D']} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
                      <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }} 
                        formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Cost']}
                        labelStyle={{ color: '#fff', fontWeight: 'bold' }} 
                      />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                      <Bar dataKey="predicted" name="Predicted Cost (₹)" fill="#52525b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="actual" name="Actual Cost (₹)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* HISTORY LOG TABLE PREVIEW */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-zinc-400" /> Recent Operational Audit History
                </h3>
                <button 
                  onClick={() => setActiveTab('history')} 
                  className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  View Complete Logs <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-950 text-zinc-400 font-mono uppercase tracking-wider border-b border-zinc-800">
                      <tr>
                        <th className="p-4">Date</th>
                        <th className="p-4">Disruption Event</th>
                        <th className="p-4">Action Taken</th>
                        <th className="p-4">Predicted</th>
                        <th className="p-4">Actual</th>
                        <th className="p-4">Outcome</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                      {filteredHistory.slice(0, 4).map((log) => (
                        <tr key={log.id} onClick={() => setSelectedHistoryItem(log)} className="hover:bg-zinc-800/40 transition-colors cursor-pointer">
                          <td className="p-4 font-mono text-zinc-400">{log.date}</td>
                          <td className="p-4 font-semibold text-white">{log.event}</td>
                          <td className="p-4 text-zinc-400">{log.action}</td>
                          <td className="p-4 font-mono">{log.predicted}</td>
                          <td className="p-4 font-mono text-white">{log.actual}</td>
                          <td className="p-4">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${log.outcome === 'PROFITABLE' ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' : 'text-rose-400 bg-rose-400/10 border border-rose-400/20'}`}>
                              {log.outcome}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ACTION ENGINE */}
        {activeTab === 'action' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
                  <Cpu className="w-8 h-8 text-emerald-400" /> Prescriptive Action Engine
                </h2>
                <p className="text-zinc-400 text-xs mt-1">Autonomous Disruption Mitigation & Interactive Trade-off Simulator</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-400" /> Add Custom Scenario
                </button>
                <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
                  <span className="text-xs text-zinc-400 pl-3 hidden sm:inline">Active Scenario:</span>
                  <select 
                    value={selectedDisruption.id}
                    onChange={(e) => setSelectedDisruption(disruptions.find(s => s.id === e.target.value))}
                    className="bg-zinc-950 text-white text-xs font-bold py-2 px-3 rounded-lg border border-zinc-800 focus:outline-none cursor-pointer"
                  >
                    {disruptions.map(s => (
                      <option key={s.id} value={s.id}>{s.title} ({s.severity})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* DISRUPTION CONTROL PANEL */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl space-y-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-md">
                      {selectedDisruption.severity} DISRUPTION
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">Supplier: {selectedDisruption.supplier}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedDisruption.title}</h3>
                </div>
                <div className="flex gap-4 font-mono text-xs">
                  <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block uppercase">Affected SKU</span>
                    <span className="text-white font-bold">{selectedDisruption.affectedProduct}</span>
                  </div>
                  <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block uppercase">Origin Port</span>
                    <span className="text-emerald-400 font-bold">{selectedDisruption.originPort}</span>
                  </div>
                </div>
              </div>

              {/* REALTIME TRADE-OFF SLIDERS */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-400" /> Interactive Optimization Constraints
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-950 p-5 rounded-xl border border-zinc-800">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Buffer Stock Allocation</span>
                      <span className="text-emerald-400 font-mono font-bold">{bufferInventory}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={bufferInventory}
                      onChange={(e) => setBufferInventory(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Air Freight Capacity Cap</span>
                      <span className="text-cyan-400 font-mono font-bold">{airFreightCap}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={airFreightCap}
                      onChange={(e) => setAirFreightCap(Number(e.target.value))}
                      className="w-full accent-cyan-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Max Expedite Budget (INR)</span>
                      <span className="text-amber-400 font-mono font-bold">₹{(expeditedBudget/100000).toFixed(1)}L</span>
                    </div>
                    <input 
                      type="range" 
                      min="500000" 
                      max="5000000" 
                      step="100000"
                      value={expeditedBudget}
                      onChange={(e) => setExpeditedBudget(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DYNAMIC OPTION CARDS */}
            <div className="space-y-4">
              <h3 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" /> Prescriptive Resolution Strategies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedDisruption.options.map((option) => {
                  const computed = computeOptionCostAndDelay(option);
                  return (
                    <DecisionCard 
                      key={option.id} 
                      option={option} 
                      computedCost={computed.cost} 
                      computedDelay={computed.delay} 
                      onExecute={(o) => setShowConfirm(o)} 
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ANALYTICS SUITE */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-cyan-400" /> Analytics & Intelligence Suite
                </h2>
                <p className="text-zinc-400 text-xs mt-1">Cost Realization Analytics & ML Model Drift Intelligence (INR)</p>
              </div>

              {/* TIME RANGE FILTER */}
              <div className="flex items-center gap-3">
                <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
                  {['7D', '30D', '90D'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${timeRange === range ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => triggerToast("Analytics Summary exported successfully.")}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4 text-zinc-400" /> Export Summary
                </button>
              </div>
            </div>

            {/* TOP ANALYTICS KPIS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard title="Cumulative Net Saved" value="₹48.2 Lakhs" subValue="+18.4%" trend="up" icon={IndianRupee} />
              <MetricCard title="Mean Cost Variance" value="3.8%" subValue="-1.2%" trend="up" icon={TrendingUp} />
              <MetricCard title="ML Model Drift" value="0.04" subValue="Stable" trend="up" icon={Activity} />
              <MetricCard title="Lead Time Saved" value="48.5 Days" subValue="+14 Days" trend="up" icon={Package} />
            </div>

            {/* CHARTS GRID 1: LINE CHART & DONUT CHART */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* CUMULATIVE SAVINGS AREA CHART */}
              <div className="lg:col-span-2 bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" /> Cumulative Capital Saved Trend ({timeRange})
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">INR Currency</span>
                </div>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timelineDataMap[timeRange]} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                      <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `₹${(v/100000).toFixed(0)}L`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                        formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Capital Saved']}
                        labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="capitalSaved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCapital)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* PIE CHART */}
              <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-cyan-400" /> Strategy Category Share
                </h3>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                        formatter={(value) => [`${value}%`, 'Share']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1.5 text-xs">
                  {categoryDistribution.map((item) => (
                    <div key={item.name} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-zinc-400">{item.name}</span>
                      </div>
                      <span className="text-white font-mono font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PREDICTED VS ACTUAL DISCREPANCY BAR CHART */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-white">Cost Realization Discrepancies by Fix (INR)</h3>
                <span className="text-xs text-zinc-500 font-mono">Time Range: {timeRange}</span>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={initialAnalyticsData[timeRange]} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
                    <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }} 
                      formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Cost']}
                      labelStyle={{ color: '#fff', fontWeight: 'bold' }} 
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    <Bar dataKey="predicted" name="Predicted Cost (₹)" fill="#52525b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actual" name="Actual Cost (₹)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HISTORY LOGS */}
        {activeTab === 'history' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
                  <History className="w-8 h-8 text-amber-400" /> Operational Audit Log Trail
                </h2>
                <p className="text-zinc-400 text-xs mt-1">Complete Closed-Loop Operational Execution & Financial Audit (INR)</p>
              </div>
              <button 
                onClick={() => triggerToast("CSV Audit logs exported successfully.")}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4 text-zinc-400" /> Export CSV Audit Log
              </button>
            </div>

            {/* SEARCH AND FILTER BAR */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input 
                  type="text" 
                  placeholder="Search by event, action, SKU, or operator..." 
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 pl-10 pr-4 py-2 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-xs text-zinc-400">Status:</span>
                  <div className="flex gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                    {['ALL', 'PROFITABLE', 'OVER BUDGET'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setOutcomeFilter(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${outcomeFilter === st ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Sort:</span>
                  <select 
                    value={historySort}
                    onChange={(e) => setHistorySort(e.target.value)}
                    className="bg-zinc-950 text-white text-xs font-bold py-1.5 px-3 rounded-xl border border-zinc-800 focus:outline-none cursor-pointer"
                  >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="id-desc">Highest Audit ID</option>
                  </select>
                </div>
              </div>
            </div>

            {/* AUDIT LOG TABLE */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 text-zinc-400 font-mono uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="p-4">Date</th>
                      <th className="p-4">Disruption Event</th>
                      <th className="p-4">Prescriptive Action</th>
                      <th className="p-4">SKU / Origin</th>
                      <th className="p-4">Predicted</th>
                      <th className="p-4">Actual</th>
                      <th className="p-4">Variance</th>
                      <th className="p-4">Outcome</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                    {filteredHistory.length > 0 ? (
                      filteredHistory.map((log) => (
                        <tr key={log.id} className="hover:bg-zinc-800/40 transition-colors">
                          <td className="p-4 font-mono text-zinc-400">{log.date}</td>
                          <td className="p-4 font-bold text-white">{log.event}</td>
                          <td className="p-4 text-zinc-400">{log.action}</td>
                          <td className="p-4 font-mono text-zinc-400">
                            <span className="block text-zinc-300 font-bold">{log.SKU}</span>
                            <span className="text-[10px] text-emerald-400">{log.origin}</span>
                          </td>
                          <td className="p-4 font-mono">{log.predicted}</td>
                          <td className="p-4 font-mono text-white">{log.actual}</td>
                          <td className={`p-4 font-mono ${log.outcome === 'PROFITABLE' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}`}>
                            {log.discrepancy}
                          </td>
                          <td className="p-4">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${log.outcome === 'PROFITABLE' ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' : 'text-rose-400 bg-rose-400/10 border border-rose-400/20'}`}>
                              {log.outcome}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => setSelectedHistoryItem(log)}
                              className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="p-8 text-center text-zinc-500 font-mono">
                          No audit records found matching the current search parameters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
