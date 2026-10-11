import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
export default function PublicLayout() { return <><Header/><main className="page-shell"><Outlet/></main><footer className="site-footer"><span>© 2026 ShopFlow</span><span>Projeto acadêmico · Dados via DummyJSON</span></footer></>; }
