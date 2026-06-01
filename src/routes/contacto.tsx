import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/lib/toast";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Willy Store" },
      { name: "description", content: "Ponete en contacto con Willy Store. Atendemos todas tus consultas." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nombre requerido").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000),
});

function ContactPage() {
  const { notify } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    notify("¡Mensaje enviado! Te responderemos pronto.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container-x py-16">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Contacto</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2">Hablemos</h1>
        <p className="text-muted-foreground mt-3">¿Tenés una consulta? Escribinos y te responderemos a la brevedad.</p>
      </div>

      <div className="mt-12 grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <a href="https://instagram.com/willystore_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 border border-border rounded-sm hover:border-navy transition-colors">
            <Instagram className="size-6 text-navy" />
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Instagram</p><p className="font-semibold">@willystore_</p></div>
          </a>
          <a href="https://facebook.com/willystore" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 border border-border rounded-sm hover:border-navy transition-colors">
            <Facebook className="size-6 text-navy" />
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Facebook</p><p className="font-semibold">Willy Store</p></div>
          </a>
          <a href="mailto:willystore@gmail.com" className="flex items-center gap-4 p-5 border border-border rounded-sm hover:border-navy transition-colors">
            <Mail className="size-6 text-navy" />
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p><p className="font-semibold">willystore@gmail.com</p></div>
          </a>
          <div className="flex items-center gap-4 p-5 border border-border rounded-sm">
            <MapPin className="size-6 text-navy" />
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Ubicación</p><p className="font-semibold">Asunción, Paraguay</p></div>
          </div>
        </div>

        <form onSubmit={submit} noValidate className="space-y-4">
          <label className="block">
            <span className="block text-xs uppercase tracking-widest font-semibold mb-1.5">Nombre</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`input-base ${errors.name ? "border-destructive" : ""}`} />
            {errors.name && <span className="text-xs text-destructive mt-1 block">{errors.name}</span>}
          </label>
          <label className="block">
            <span className="block text-xs uppercase tracking-widest font-semibold mb-1.5">Email</span>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`input-base ${errors.email ? "border-destructive" : ""}`} />
            {errors.email && <span className="text-xs text-destructive mt-1 block">{errors.email}</span>}
          </label>
          <label className="block">
            <span className="block text-xs uppercase tracking-widest font-semibold mb-1.5">Mensaje</span>
            <textarea rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`input-base resize-none ${errors.message ? "border-destructive" : ""}`} />
            {errors.message && <span className="text-xs text-destructive mt-1 block">{errors.message}</span>}
          </label>
          <button type="submit" className="btn-primary w-full">Enviar mensaje</button>
        </form>
      </div>
    </div>
  );
}
