import { useEffect, useState, type ReactNode } from "react";
import {
  Alert,
  Button,
  Loader,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { IconPackage, IconShoppingBag, IconUsers } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { api, readableError } from "../../services/api";
export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    Promise.all([api.get("/products?limit=0"), api.get("/products/categories")])
      .then(([p, c]) => {
        if (active)
          setStats({
            products: p.data.total,
            categories: Array.isArray(c.data) ? c.data.length : 0,
          });
      })
      .catch((e) => {
        if (active) setError(readableError(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <Title order={1}>Visão geral</Title>
          <Text c="dimmed" mt={5}>
            Acompanhe o catálogo e gerencie seus produtos.
          </Text>
        </div>
        <Button
          component={Link}
          to="/admin/produtos"
          color="violet"
          leftSection={<IconPackage size={17} />}
        >
          Gerenciar produtos
        </Button>
      </div>
      {error && (
        <Alert color="red" mb="lg">
          {error}
        </Alert>
      )}
      {loading ? (
        <Loader color="violet" />
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          <Stat
            icon={<IconPackage />}
            label="Produtos no catálogo"
            value={String(stats.products)}
          />
          <Stat
            icon={<IconShoppingBag />}
            label="Categorias disponíveis"
            value={String(stats.categories)}
          />
          <Stat icon={<IconUsers />} label="Sessão" value="Autenticada" />
        </SimpleGrid>
      )}
      <Paper className="admin-note" mt="xl" p="xl" radius="lg" withBorder>
        <Title order={3}>Tudo pronto para gerenciar?</Title>
        <Text c="dimmed" mt="sm" maw={600}>
          Os endpoints de escrita da DummyJSON simulam alterações. Os dados
          criados, editados ou excluídos não são persistidos de forma permanente
          na API.
        </Text>
        <Button
          component={Link}
          to="/admin/produtos"
          mt="lg"
          variant="light"
          color="violet"
        >
          Abrir gerenciamento
        </Button>
      </Paper>
    </>
  );
}
function Stat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Paper className="stat-card" p="lg" radius="lg" withBorder>
      <div className="stat-icon">{icon}</div>
      <Text c="dimmed" size="sm" mt="md">
        {label}
      </Text>
      <Title order={2} mt={5}>
        {value}
      </Title>
    </Paper>
  );
}
