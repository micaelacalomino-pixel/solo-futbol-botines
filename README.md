# Solo Futbol Botines

Sitio catálogo (vidriera) que lee los productos desde una Google Sheet
publicada como CSV, y deriva a WhatsApp para cerrar cada venta.

## Estructura

- `app/page.tsx` — catálogo (grilla de productos)
- `app/producto/[id]/page.tsx` — ficha individual con selector de talle
- `lib/catalogo.ts` — lee y parsea la Sheet publicada como CSV
- `lib/whatsapp.ts` — arma el link de WhatsApp con el mensaje prellenado
- `components/` — ProductoCard, ProductoGrid, SelectorTalleYConsultar

## Correr en local

1. Instalar dependencias:
   ```
   npm install
   ```
2. `.env.local` ya tiene cargadas `CATALOGO_CSV_URL` y `NEXT_PUBLIC_WHATSAPP_NUMERO`.
   Revisar que el número de WhatsApp sea el correcto.
3. Levantar el server de desarrollo:
   ```
   npm run dev
   ```
4. Abrir http://localhost:3000

## Actualizar el catálogo

Editar directamente la Google Sheet (pestaña "Catalogo"). Los cambios
se reflejan solos en el sitio en producción cada ~5 minutos
(no hace falta redeploy).

## Deploy en Vercel

1. Subir este proyecto a un repo de GitHub.
2. En vercel.com → "Add New Project" → importar el repo.
3. En "Environment Variables" cargar las mismas dos variables que
   están en `.env.local` (Vercel no lee `.env.local`, hay que
   agregarlas a mano en su panel).
4. Deploy. Cada push a `main` vuelve a desplegar solo.

## Conectar el dominio propio

1. Comprar el dominio (Namecheap, Google Domains, etc.).
2. En el proyecto de Vercel → Settings → Domains → agregar el dominio.
3. Vercel muestra los registros DNS exactos que hay que cargar en el
   proveedor del dominio (normalmente un registro A o CNAME).
4. Esperar la propagación (puede tardar de minutos a un par de horas).

## Pendiente de definir

- Subir las fotos reales de cada producto a Cloudinary y cargar los
  links en la Sheet (columnas foto1/foto2/foto3).
- Revisar que cada fila de la Sheet tenga el nombre sin espacios de más
  (ver nota sobre "Phatom " en el chat de diseño).
