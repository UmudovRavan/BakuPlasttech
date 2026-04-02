import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ListCollapse, MessageSquare, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const AdminSidebar = () => {
  const { admin, logout } = useAdminAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Məhsullar', path: '/admin/products', icon: <ShoppingBag size={18} /> },
    { name: 'Kateqoriyalar', path: '/admin/categories', icon: <ListCollapse size={18} /> },
    { name: 'Müraciətlər', path: '/admin/inquiries', icon: <MessageSquare size={18} />, badge: 12 },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border-clean/50 flex flex-col fixed h-full z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="px-8 py-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-lg transition-transform group-hover:scale-110">
            B
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-dark uppercase tracking-tight leading-none">BakuPlastTech</span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] mt-1">Admin Panel</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <div className="px-4 py-2 mb-2">
          <p className="text-[10px] font-bold text-dark/30 uppercase tracking-[0.15em]">MENYU</p>
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 group relative ${
                isActive 
                ? 'bg-primary-light text-primary' 
                : 'text-dark/50 hover:bg-light-gray hover:text-dark'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`flex-shrink-0 transition-colors ${isActive ? 'text-primary' : 'group-hover:text-dark'}`}>
                  {item.icon}
                </span>
                <span className="text-[13px]">{item.name}</span>
                
                {item.badge && !isActive && (
                  <span className="ml-auto bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <div className="absolute right-4">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(227,6,19,0.4)]" />
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}

        <div className="px-4 pt-8 pb-3">
          <p className="text-[10px] font-bold text-dark/30 uppercase tracking-[0.15em]">AYARLAR</p>
        </div>
        
        <NavLink
            to="/admin/settings"
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 group relative ${
                isActive 
                ? 'bg-primary-light text-primary' 
                : 'text-dark/50 hover:bg-light-gray hover:text-dark'
              }`
            }
          >
          <Settings size={18} />
          <span className="text-[13px]">Sistem Ayarları</span>
        </NavLink>
      </nav>

      <div className="p-4 mt-auto mb-2 px-6">
        <div className="bg-light-gray/50 rounded-2xl p-4 border border-border-clean/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-border-clean flex items-center justify-center font-bold text-sm text-primary shadow-sm uppercase">
              {admin?.username?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-[12px] font-black text-dark truncate leading-tight uppercase">
                {admin?.username || 'Giriş Edilməyib'}
              </p>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider mt-0.5">Admin</p>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-dark/60 hover:text-error-text hover:bg-error-bg border border-border-clean/50 transition-all font-bold text-xs"
          >
            <LogOut size={14} />
            Çıxış Et
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;

