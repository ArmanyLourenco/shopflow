import { NavLink, Outlet } from 'react-router-dom';
import { IconChartBar, IconPackage } from '@tabler/icons-react';
export default function AdminLayout() { return <div className="admin-layout"><aside className="admin-sidebar"><p className="eyebrow">WORKSPACE</p><h2>Administração</h2><NavLink to="/admin" end><IconChartBar size={18}/> Visão geral</NavLink><NavLink to="/admin/produtos"><IconPackage size={18}/> Produtos</NavLink><p className="sidebar-note">Área protegida · ShopFlow</p></aside><section className="admin-content"><Outlet/></section></div>; }
