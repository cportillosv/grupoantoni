# Guía de Deployment - Grupo Antoni

## Configuración de Servidor para Máximo Rendimiento

---

## 🚀 Configuración de Servidor

### Nginx (Recomendado)

1. **Copiar configuración:**

   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/grupoantoni
   sudo ln -s /etc/nginx/sites-available/grupoantoni /etc/nginx/sites-enabled/
   ```

2. **Actualizar rutas:**
   - Editar `/etc/nginx/sites-available/grupoantoni`
   - Cambiar `root /var/www/grupoantoni/dist;` a tu ruta
   - Configurar certificados SSL

3. **Habilitar módulos:**

   ```bash
   # Brotli (si no está instalado)
   sudo apt-get install nginx-module-brotli

   # Verificar configuración
   sudo nginx -t

   # Reiniciar
   sudo systemctl restart nginx
   ```

### Apache

1. **Habilitar módulos:**

   ```bash
   sudo a2enmod rewrite
   sudo a2enmod deflate
   sudo a2enmod expires
   sudo a2enmod headers
   ```

2. **Copiar .htaccess:**
   - El archivo `.htaccess` ya está en la raíz del proyecto
   - Asegúrate de que Apache permita `.htaccess`:
     ```apache
     <Directory /var/www/grupoantoni>
         AllowOverride All
     </Directory>
     ```

3. **Reiniciar Apache:**
   ```bash
   sudo systemctl restart apache2
   ```

---

## 📦 Build de Producción

```bash
# 1. Instalar dependencias
npm install

# 2. Optimizar imágenes (opcional pero recomendado)
npm run optimize:images

# 3. Build de producción
npm run build

# 4. El resultado estará en /dist
```

---

## ✅ Checklist Pre-Deployment

- [ ] Build de producción ejecutado (`npm run build`)
- [ ] Imágenes optimizadas (WebP generadas)
- [ ] Service Worker funcionando (`sw.js` en raíz)
- [ ] SSL/HTTPS configurado
- [ ] Headers de seguridad configurados
- [ ] Compresión Brotli/Gzip habilitada
- [ ] Cache headers configurados
- [ ] DNS configurado correctamente
- [ ] CDN configurado (si aplica)

---

## 🔍 Verificación Post-Deployment

### Lighthouse Audit

```bash
# Ejecutar Lighthouse en Chrome DevTools
# O usar CLI:
npx lighthouse https://grupoantoni.com --view
```

### Verificar Compresión

```bash
curl -H "Accept-Encoding: br" -I https://grupoantoni.com/css/main.css
curl -H "Accept-Encoding: gzip" -I https://grupoantoni.com/css/main.css
```

### Verificar Cache Headers

```bash
curl -I https://grupoantoni.com/img/hero-optimized.jpg
# Debe mostrar: Cache-Control: public, max-age=31536000, immutable
```

### Verificar Service Worker

- Abrir DevTools → Application → Service Workers
- Debe mostrar "activated and running"

---

## 📊 Métricas Objetivo

Después del deployment, verificar:

- ✅ **Lighthouse Performance:** 95+
- ✅ **LCP:** < 2.5s
- ✅ **FCP:** < 1.5s
- ✅ **CLS:** < 0.1
- ✅ **TTFB:** < 1.5s

---

## 🛠️ Troubleshooting

### Service Worker no se registra

- Verificar que `sw.js` esté en la raíz de `/dist`
- Verificar que el servidor sirva `sw.js` con `Content-Type: application/javascript`

### Imágenes no cargan

- Verificar que las imágenes optimizadas estén en `/dist/img/`
- Verificar rutas en HTML (deben ser relativas o absolutas desde raíz)

### Compresión no funciona

- Verificar que los módulos estén habilitados
- Verificar logs del servidor para errores

---

**Última actualización:** 2025-01-XX
