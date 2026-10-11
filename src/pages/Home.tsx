import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Group,
  Loader,
  Select,
  SimpleGrid,
  TextInput,
  Title,
  Text,
  Center,
  Pagination,
} from "@mantine/core";
import { IconSearch, IconSparkles, IconAlertCircle } from "@tabler/icons-react";
import { api, readableError } from "../services/api";
import { productsResponseSchema, type Product } from "../types/product";
import ProductCard from "../components/ProductCard";
const PAGE_SIZE = 12;
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    const params = new URLSearchParams({
      limit: "100",
      select:
        "id,title,description,category,price,discountPercentage,rating,stock,brand,thumbnail,images",
    });
    api
      .get(`/products?${params}`)
      .then((res) => {
        const parsed = productsResponseSchema.safeParse(res.data);
        if (!parsed.success)
          throw new Error("A API retornou produtos em formato inesperado.");
        if (active) {
          setProducts(parsed.data.products);
          setCategories(
            [...new Set(parsed.data.products.map((p) => p.category))].sort(),
          );
        }
      })
      .catch((err) => {
        if (active) setError(readableError(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (!category || p.category === category) &&
          `${p.title} ${p.description} ${p.brand ?? ""}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [products, category, search],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-pill">
            <IconSparkles size={14} /> SUA PRÓXIMA DESCOBERTA
          </div>
          <Title order={1}>
            Encontre algo
            <br />
            <span className="gradient-text">extraordinário.</span>
          </Title>
          <Text c="dimmed" size="lg" maw={470}>
            Produtos selecionados para simplificar sua rotina. Explore novidades
            e encontre o que combina com você.
          </Text>
          <Group mt="xl">
            <Button component="a" href="#catalogo" color="violet" size="md">
              Explorar catálogo
            </Button>
            <Text size="sm" c="dimmed">
              Produtos demonstrativos
            </Text>
          </Group>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="hero-glass">
            <IconShoppingCartGraphic />
            <span>DESCUBRA</span>
            <strong>
              Seu próximo
              <br />
              favorito.
            </strong>
            <small>SHOPFLOW / 2026</small>
          </div>
          <div className="float-chip chip-top">✦ Novidades</div>
          <div className="float-chip chip-bottom">◎ Compra simples</div>
        </div>
      </section>
      <section id="categorias" className="trust-row">
        <div>
          <strong>01</strong>
          <span>Explore produtos</span>
        </div>
        <div>
          <strong>02</strong>
          <span>Compare opções</span>
        </div>
        <div>
          <strong>03</strong>
          <span>Monte seu carrinho</span>
        </div>
      </section>
      <section id="catalogo" className="catalog-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A VITRINE</p>
            <Title order={2}>Explore o catálogo</Title>
            <Text c="dimmed" mt={6}>
              Encontre seu próximo favorito entre os produtos.
            </Text>
          </div>
          <Text c="dimmed" size="sm">
            {filtered.length} produtos encontrados
          </Text>
        </div>
        <div className="filters">
          <TextInput
            aria-label="Buscar produtos"
            placeholder="Buscar por nome ou marca..."
            leftSection={<IconSearch size={17} />}
            value={search}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
              setPage(1);
            }}
            className="search-input"
          />
          <Select
            aria-label="Filtrar por categoria"
            placeholder="Todas as categorias"
            clearable
            data={categories.map((c) => ({
              value: c,
              label: c.replace(/-/g, " "),
            }))}
            value={category}
            onChange={(v) => {
              setCategory(v);
              setPage(1);
            }}
            className="category-select"
          />
        </div>
        {loading ? (
          <Center mih={240}>
            <Loader color="violet" />
            <Text ml="md" c="dimmed">
              Carregando catálogo...
            </Text>
          </Center>
        ) : error ? (
          <Alert
            color="red"
            icon={<IconAlertCircle />}
            title="Não foi possível carregar os produtos"
          >
            {error}
            <Button
              mt="sm"
              onClick={() => location.reload()}
              variant="light"
              color="red"
            >
              Tentar novamente
            </Button>
          </Alert>
        ) : visible.length === 0 ? (
          <div className="empty-state">
            <Title order={3}>Nenhum produto encontrado</Title>
            <Text c="dimmed">Tente mudar a busca ou remover os filtros.</Text>
          </div>
        ) : (
          <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, lg: 4 }} spacing="lg">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        )}
        {!loading && !error && filtered.length > PAGE_SIZE && (
          <Center mt="xl">
            <Pagination
              value={page}
              onChange={setPage}
              total={pages}
              color="violet"
            />
          </Center>
        )}
      </section>
    </>
  );
}
function IconShoppingCartGraphic() {
  return <div className="hero-icon">✳</div>;
}
