# 🎨 DESIGN SYSTEM — D'GUST ERP

Documentação oficial dos padrões visuais, animações e componentes do sistema.

---

## 📌 PRINCÍPIOS

- **Consistência visual** em todo o sistema
- **Animações suaves** e não intrusivas
- **Responsividade** mobile-first
- **Acessibilidade** (WCAG 2.1 AA)
- **Performance** (carregamento < 2s)

---

## 🎨 DESIGN TOKENS

### Paleta de Cores (Tokens Semânticos)

```javascript
// ✅ CORRETO — Usar tokens semânticos
className="bg-primary-500 text-white"
className="border-danger-500"
className="text-success-600"

// ❌ ERRADO — Cores diretas
className="bg-blue-500"
className="text-red-500"
```

| Token      | Uso                          | Exemplo                      |
|------------|------------------------------|------------------------------|
| `primary`  | Ações principais, links      | Botão "Salvar"               |
| `success`  | Confirmações, sucesso        | "Produto cadastrado!"        |
| `warning`  | Alertas, atenção             | Estoque baixo                |
| `danger`   | Erros, exclusões             | Validação falhou             |
| `neutral`  | Textos, bordas, backgrounds  | Layout base                  |

### Escala de Tons

Cada cor tem 10 tons (50-900):
- **50-100**: Fundos muito claros
- **200-300**: Bordas, hover suave
- **400-500**: **Principal** (500 = padrão)
- **600-700**: Hover, active states
- **800-900**: Texto, ênfase forte

---

## ⚡ ANIMAÇÕES

### 1. Skeleton Loading (Obrigatório para Tabelas)

```jsx
import SkeletonTable from '@/components/SkeletonTable';

{loading ? (
  <SkeletonTable rows={5} columns={6} />
) : (
  <table>...</table>
)}
```

**Quando usar:**
- ✅ Tabelas (produtos, estoque, vendas)
- ✅ Listagens longas
- ✅ Dashboards
- ❌ Nunca usar spinner em tabelas

### 2. Hover Effects (Duração: 200ms)

```jsx
// Linha de tabela
<tr className="table-row-hover">

// Botão (já incluído no componente Button)
<Button>Salvar</Button>

// Card
<div className="transition-smooth hover:shadow-lg hover:scale-[1.02]">
```

### 3. Modal Animation

```jsx
// Overlay
<div className="modal-overlay fixed inset-0 bg-black/50">

// Conteúdo
<div className="modal-content bg-white rounded-lg shadow-modal">
```

### 4. Toast (React Toastify)

```javascript
import { showToast } from '@/components/ToastNotifications';

// Sucesso
showToast.success('Produto cadastrado com sucesso!');

// Erro
showToast.error('Erro ao salvar produto');

// Warning
showToast.warning('Estoque abaixo do mínimo');

// Info
showToast.info('Sincronização iniciada');

// Loading (async)
const toastId = showToast.loading('Processando...');
// ... após conclusão
showToast.update(toastId, { message: 'Concluído!', type: 'success' });
```

### 5. Transição de Página/Aba

```jsx
// Fade simples (200ms)
<div className="fade-in">
  {conteúdo da aba}
</div>
```

### 6. Dropdown Animation

```jsx
// Select/Dropdown (150ms)
<select className="transition-all duration-150 transform origin-top">
```

### 7. Spinner (Uso Restrito)

```jsx
import Button from '@/components/Button';

// Apenas em botões de submit
<Button loading={isSubmitting}>
  Salvar
</Button>
```

**❌ Nunca usar spinner em:**
- Tabelas (usar skeleton)
- Carregamento de página inteira

### 8. Pulse (Alerta Crítico)

```jsx
// Apenas para situações críticas
<div className="pulse-critical">
  ⚠️ Estoque ZERADO
</div>
```

---

## 🧱 COMPONENTES PADRONIZADOS

### Button

```jsx
import Button from '@/components/Button';
import { Save, Trash } from 'lucide-react';

// Variantes
<Button variant="primary">Salvar</Button>
<Button variant="success">Confirmar</Button>
<Button variant="danger">Excluir</Button>
<Button variant="outline">Cancelar</Button>
<Button variant="ghost">Fechar</Button>

// Com ícone
<Button icon={<Save size={16} />}>
  Salvar
</Button>

// Loading state
<Button loading={isSubmitting}>
  Salvando...
</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>
```

### Input

```jsx
import Input from '@/components/Input';
import { Search } from 'lucide-react';

// Básico
<Input 
  label="Nome do Produto"
  placeholder="Ex: Pizza Margherita"
  required
/>

// Com ícone
<Input 
  icon={<Search size={16} />}
  placeholder="Buscar..."
/>

// Com erro
<Input 
  label="Preço"
  error="Preço deve ser maior que zero"
/>

// Com helper text
<Input 
  label="NCM"
  helperText="Código da Receita Federal"
/>
```

### SkeletonTable

```jsx
import SkeletonTable, { SkeletonCard, SkeletonKpiCard } from '@/components/SkeletonTable';

// Tabela
<SkeletonTable rows={10} columns={7} />

// Card
<SkeletonCard />

// KPI Card (Dashboard)
<SkeletonKpiCard />
```

---

## 📱 RESPONSIVIDADE

```jsx
// Mobile-first
<div className="
  px-4           {/* Mobile: padding 16px */}
  sm:px-6        {/* Tablet: padding 24px */}
  lg:px-8        {/* Desktop: padding 32px */}
">

// Grid responsivo
<div className="
  grid 
  grid-cols-1       {/* Mobile: 1 coluna */}
  md:grid-cols-2    {/* Tablet: 2 colunas */}
  lg:grid-cols-3    {/* Desktop: 3 colunas */}
  gap-4
">
```

### Breakpoints
- `sm`: 640px (tablet pequeno)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (desktop grande)

---

## 🔌 PLUGINS OBRIGATÓRIOS

### Instalados e Configurados

| Plugin              | Uso                          |
|---------------------|------------------------------|
| `react-toastify`    | Notificações                 |
| `lucide-react`      | Ícones (único permitido)     |
| `react-hook-form`   | Formulários                  |
| `@tanstack/react-query` | Fetch/Cache             |
| `zustand`           | Estado global                |
| `axios`             | HTTP client                  |
| `@supabase/supabase-js` | Backend              |

---

## ✅ CHECKLIST DE UI/UX

Antes de considerar uma tela **pronta**:

- [ ] Usa tokens de cor (primary, success, etc)
- [ ] Skeleton loading nas tabelas
- [ ] Hover suave em elementos interativos
- [ ] Modal com animação de entrada/saída
- [ ] Toast para feedback de ações
- [ ] Transições de 200ms em mudanças de estado
- [ ] Componentes Button e Input padronizados
- [ ] Responsividade mobile/tablet/desktop
- [ ] Acessibilidade (labels, aria-*)
- [ ] Sem CSS inline ou classes diretas de cor

---

## 🚫 ANTI-PADRÕES (NÃO FAZER)

```jsx
// ❌ Cores diretas
className="bg-blue-500"

// ❌ Spinner em tabela
{loading && <div className="spinner" />}

// ❌ Alert nativo
alert('Produto salvo!');

// ❌ CSS inline
style={{ color: 'red', fontSize: 16 }}

// ❌ Misturar bibliotecas de ícones
import { FaUser } from 'react-icons/fa';  // ❌ Não!
import { User } from 'lucide-react';      // ✅ Sim!

// ❌ Formulário sem validação
<form onSubmit={handleSubmit}>  // ❌ Não!
// ✅ Usar react-hook-form
```

---

## 📚 EXEMPLOS DE IMPLEMENTAÇÃO

### Tabela com Skeleton

```jsx
import { useState, useEffect } from 'react';
import SkeletonTable from '@/components/SkeletonTable';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProdutos().then(data => {
      setProdutos(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <SkeletonTable rows={10} columns={6} />;

  return (
    <table className="min-w-full">
      <thead>...</thead>
      <tbody>
        {produtos.map(produto => (
          <tr key={produto.id} className="table-row-hover">
            <td>{produto.nome}</td>
            ...
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Modal com Animação

```jsx
function ProdutoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="modal-overlay absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Conteúdo */}
      <div className="modal-content relative bg-white rounded-lg shadow-modal p-6 max-w-2xl w-full mx-4">
        <h2>Novo Produto</h2>
        ...
      </div>
    </div>
  );
}
```

---

## 🎯 RESULTADO ESPERADO

- ✅ Visual consistente em todo o sistema
- ✅ Animações suaves e padronizadas
- ✅ Feedback claro para o usuário
- ✅ Experiência profissional de ERP
- ✅ Código reutilizável e manutenível
