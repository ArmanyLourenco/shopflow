# ShopFlow — catálogo demonstrativo com React + TypeScript

> **Aplicação publicada:** após concluir o deploy, substitua este texto pelo link real `https://SEU-USUARIO.github.io/shopflow/`.
>
> **Repositório:** `https://github.com/SEU-USUARIO/shopflow` (substitua pelo endereço real do seu repositório).

ShopFlow é uma aplicação acadêmica de e-commerce demonstrativo que consome a API pública [DummyJSON](https://dummyjson.com). Possui vitrine pública, pesquisa, filtro por categoria, paginação, detalhes de produtos, carrinho e painel administrativo com login.

## Tecnologias

- React 18, TypeScript e Vite
- Mantine UI e Mantine Form
- React Router, Context API e Custom Hooks
- Axios, interceptors e Zod
- Vitest, React Testing Library e Playwright
- GitHub Actions e GitHub Pages

## Requisitos

- Node.js 20 ou superior (recomendado)
- npm incluído com Node.js
- Git e uma conta no GitHub

## Executar localmente

1. Extraia o ZIP e abra a pasta `shopflow` no VS Code.
2. No terminal, execute:

   ```bash
   npm install
   npm run dev
   ```

   O `npm install` criará o `package-lock.json`. **Antes do primeiro push, confira se esse arquivo foi criado e inclua-o no Git**; os workflows usam `npm ci` para instalar exatamente as versões registradas.

3. Abra o endereço local indicado pelo Vite, normalmente `http://localhost:5173`.
4. Para verificar os tipos e gerar o build de produção: `npm run build`.
5. Para executar os testes unitários: `npm test`.
6. Para testes E2E, instale o navegador uma vez com `npx playwright install chromium` e execute `npm run test:e2e`.

## Autenticação de demonstração

A tela de login utiliza `POST https://dummyjson.com/auth/login`. Credenciais de demonstração conhecidas (podem mudar conforme a API):

- Usuário: `emilys`
- Senha: `emilyspass`

A autenticação é validada pela API; o token retornado é armazenado no `localStorage` e enviado pelo interceptor Axios como `Authorization: Bearer <token>`. Este é um exercício acadêmico, não um sistema de segurança de produção.

## Tema e funcionalidades

**Tema escolhido:** catálogo e compras. A área pública permite busca, filtro, paginação, detalhes e carrinho. A área administrativa é protegida e inclui painel e operações de inclusão, edição e exclusão demonstrativas.

**Limitação da DummyJSON:** as operações de escrita simulam a resposta, mas não salvam alterações permanentemente no servidor. O carrinho é mantido no estado React e é reiniciado quando a aplicação é recarregada.

## Checklist dos 10 requisitos técnicos

- [x] **1. Componentes e TypeScript:** projeto Vite com React + TypeScript, componentes funcionais separados, interfaces e tipos explícitos, sem `any` intencional. Os componentes recebem props tipadas e utilizam composição. Os estilos responsivos ficam em `src/styles.css`.
- [x] **2. Estado reativo e ciclo de vida:** `useState` gerencia formulários, filtros, paginação, produtos e carrinho. Atualizações de arrays/objetos são imutáveis com spread, `map` e `filter`. Os `useEffect` usam dependências e funções de limpeza para evitar atualizações após desmontagem.
- [x] **3. Context API e Custom Hooks:** `AuthProvider` compartilha usuário/token e `CartProvider` compartilha itens do carrinho. `useAuth` e `useCart` validam se foram usados dentro do Provider correto.
- [x] **4. React Router:** rotas declarativas, layouts com `Outlet`, links com `NavLink`, navegação programática com `useNavigate`, parâmetro dinâmico `produtos/:id` lido com `useParams` e rotas administrativas protegidas.
- [x] **5. Mantine UI e formulários:** `MantineProvider`, tema escuro com roxo, layouts responsivos, formulários com `@mantine/form`, indicadores de carregamento, feedback por notificações e paginação.
- [x] **6. JWT e rotas protegidas:** login real em `POST /auth/login`, token e dados mínimos da sessão no `localStorage`, estado sincronizado no contexto e redirecionamento para login quando o usuário não está autenticado.
- [x] **7. REST, Axios e Zod:** instância Axios em `src/services/api.ts`, `baseURL` da DummyJSON, interceptor de requisição para anexar token e interceptor de resposta para erros amigáveis. Schemas Zod, tipos inferidos, `safeParse` para respostas e `zodResolver` nos formulários.
- [x] **8. Vitest e RTL:** teste de componente usando React Testing Library, consultas acessíveis e `user-event`, com wrappers de roteamento, Mantine e contexto em memória. Execute `npm test` para validar localmente.
- [x] **9. Playwright:** dois fluxos E2E: catálogo/busca e redirecionamento da rota administrativa para login. Execute `npx playwright install chromium` e `npm run test:e2e`.
- [x] **10. CI/CD e deploy:** workflows em `.github/workflows/` executam build, Vitest, Playwright e publicação do build no GitHub Pages. `vite.config.ts` define `base: '/shopflow/'`; `public/404.html` oferece fallback para rotas SPA. Configure proteção da branch `main` nas configurações do repositório.

> Os itens descrevem o que foi configurado no código. Os testes precisam ser executados no seu ambiente ou no GitHub Actions para confirmar que passam; a publicação só estará concluída após o workflow de deploy terminar com sucesso.

## Publicar no GitHub Pages — passo a passo

1. **Crie um repositório público:** no GitHub, clique em **New repository**, use o nome `shopflow` e marque **Public**. Não é necessário criar README no GitHub, pois este projeto já contém um.
2. **Ajuste o caminho base:** se o repositório se chamar `shopflow`, mantenha `base: '/shopflow/'` em `vite.config.ts`. Se escolher outro nome, substitua por `'/NOME-DO-REPOSITORIO/'`.
3. **Prepare as dependências antes do primeiro push:** na pasta do projeto, execute `npm install` e aguarde a criação do `package-lock.json`. Se a instalação terminar sem erros, siga para o passo seguinte e inclua o arquivo de lock no commit.
4. **Abra o terminal na pasta do projeto** e execute:

   ```bash
   git init
   git add .
   git commit -m "feat: implementa ShopFlow"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/shopflow.git
   git push -u origin main
   ```

   Substitua `SEU-USUARIO` pelo seu usuário real do GitHub. Se a pasta já for um repositório Git, não repita `git init`; confira `git remote -v` antes de adicionar o remoto.

5. **Ative Pages:** no repositório, abra **Settings → Pages** e em **Build and deployment → Source** selecione **GitHub Actions**.
6. **Acompanhe a publicação:** abra a aba **Actions** e espere o workflow **Deploy ShopFlow to GitHub Pages** concluir com sucesso. O endereço esperado será `https://SEU-USUARIO.github.io/shopflow/`.
7. **Confira a aplicação:** abra o link publicado, teste busca, detalhes, carrinho e login. Confirme também o acesso direto a `/admin` e recarregamento de uma rota.
8. **Atualize este README:** troque os links de exemplo no início pelos links reais do repositório e da aplicação publicada. Envie o link público da aplicação no Moodle.

## CI e proteção da branch

O workflow de CI roda em push e pull request para `main`. Instala dependências via `npm ci` usando o `package-lock.json`, verifica build/tipos, executa Vitest e Playwright. O workflow de deploy publica o diretório `dist` via GitHub Pages.

Para exigir PR e checks antes de integrar: abra **Settings → Rules → Rulesets** (ou **Branches**, conforme a interface do GitHub), crie uma regra para `main`, habilite exigência de pull request e exigência de status checks, e selecione o job `test` após a primeira execução do workflow. A configuração de regras precisa ser feita na interface do GitHub e depende das opções disponíveis para o repositório/plano.

## Uso de Inteligência Artificial

A IA foi utilizada como apoio para propor a arquitetura inicial, gerar rascunhos de componentes, schemas, testes e documentação. O código deve ser revisado, executado e compreendido pelo estudante; resultados de testes e publicação não são declarados como concluídos antes de serem verificados.

## Fontes

- [DummyJSON — Products](https://dummyjson.com/docs/products)
- [DummyJSON — Auth](https://dummyjson.com/docs/auth)
- [Vite — Deploying a Static Site](https://vite.dev/guide/static-deploy.html)
