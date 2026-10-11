import { ActionIcon, Badge, Button, Group } from "@mantine/core";
import {
  IconShoppingBag,
  IconShoppingCart,
  IconLayoutDashboard,
  IconLogin,
  IconLogout,
} from "@tabler/icons-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">
            <IconShoppingBag size={22} />
          </span>
          <span>
            shop<span className="brand-accent">flow</span>
          </span>
        </NavLink>
        <nav className="main-nav" aria-label="Navegação principal">
          <NavLink to="/" end>
            Explorar
          </NavLink>
          <NavLink
            to="/"
            onClick={(event) => {
              event.preventDefault();
              navigate("/#categorias");
            }}
          >
            Categorias
          </NavLink>
        </nav>
        <Group gap="sm">
          <Button
            component={NavLink}
            to="/carrinho"
            variant="subtle"
            color="gray"
            leftSection={<IconShoppingCart size={18} />}
            aria-label={`Carrinho, ${count} itens`}
          >
            Carrinho{" "}
            <Badge ml={6} color="violet" variant="filled">
              {count}
            </Badge>
          </Button>
          {isAuthenticated ? (
            <>
              <Button
                component={NavLink}
                to="/admin"
                variant="light"
                color="violet"
                leftSection={<IconLayoutDashboard size={17} />}
                className="admin-nav"
              >
                Painel
              </Button>
              <ActionIcon
                variant="subtle"
                color="gray"
                aria-label="Sair"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <IconLogout size={18} />
              </ActionIcon>
            </>
          ) : (
            <Button
              component={NavLink}
              to="/login"
              variant="light"
              color="violet"
              leftSection={<IconLogin size={17} />}
            >
              Entrar
            </Button>
          )}
        </Group>
      </div>
    </header>
  );
}
