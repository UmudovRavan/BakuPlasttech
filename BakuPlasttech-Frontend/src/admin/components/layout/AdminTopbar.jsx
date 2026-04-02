import React from 'react';
import { Search, Bell, Plus, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminTopbar = ({ title = "Sistem İcmalı" }) => {
  const navigate = useNavigate();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-10 border-b border-border-clean/40 shadow-[0_1px_10px_rgba(0,0,0,0.01)]">
      <div className="flex flex-col">
        <h2 className="font-headline font-bold text-lg text-dark tracking-tight leading-none mb-1">{title}</h2>
        <div className="flex items-center gap-2 text-[10px] font-bold text-dark/30 uppercase tracking-widest">
          <span>Əsas Panel</span>
          <span className="w-1 h-1 bg-dark/20 rounded-full" />
          <span className="text-primary/70">{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-3 bg-light-gray/60 px-4 py-2.5 rounded-xl border border-border-clean/50 group focus-within:bg-white focus-within:border-primary/20 transition-all">
          <Search size={16} className="text-dark/40 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Axtarış..." 
            className="bg-transparent border-none outline-none text-xs font-bold text-dark placeholder:text-dark/30 w-48"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-light-gray transition-colors group">
            <Bell size={20} className="text-dark/50 group-hover:text-dark transition-colors" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary border-2 border-white rounded-full"></span>
          </button>
          
          <button 
            onClick={() => navigate('/admin/settings')}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-light-gray transition-colors group"
          >
            <Settings size={20} className="text-dark/50 group-hover:text-dark transition-colors" />
          </button>
        </div>

        <div className="h-8 w-[1px] bg-border-clean/60 mx-1" />

        <button 
          onClick={() => navigate('/admin/products')}
          className="bg-primary text-white px-5 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 active:scale-95"
        >
          <Plus size={16} strokeWidth={3} />
          Yeni Məhsul
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;

