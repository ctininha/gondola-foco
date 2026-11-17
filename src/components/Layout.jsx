export default function Layout({ children }) {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '480px', margin: '0 auto' }}>
      <header style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>
        <strong>GôndolaFoco</strong> — Auditoria de Loja
      </header>
      <main>{children}</main>
    </div>
  );
}
