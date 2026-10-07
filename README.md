# LifeGoals

Aplicación web en **Angular 18** y **Cloud Firestore** para administrar tus metas en la vida: consultar, agregar y eliminar metas guardadas en la colección `metas`.

Autor: **Hugo Ernesto Cervantes Ponce** · [github.com/hugocep](https://github.com/hugocep)

## Enlaces

| Entregable | URL |
|---|---|
| Repositorio en GitHub | https://github.com/hugocep/LifeGoals |
| Imagen en Docker Hub | https://hub.docker.com/r/darksider8888/lifegoals |
| Producción en Render | https://lifegoals-devp.onrender.com |

## Tecnologías

- Node.js 20.x y Angular 18.x (módulos, `--no-standalone`)
- Firebase / Cloud Firestore mediante `@angular/fire` (`AngularFireModule`)
- Docker (compilación con Node 20 y publicación con Nginx)
- GitHub Actions → Docker Hub → Render

## Estructura principal

```
src/
├── app/
│   ├── about/                      # Datos de contacto
│   ├── home/                       # Alta, consulta y eliminación de metas
│   ├── models/meta.model.ts        # Modelo de la colección `metas`
│   ├── services/meta-service.service.ts  # Acceso a Firestore
│   ├── app-routing.module.ts       # Rutas /home y /about
│   ├── app.component.ts            # Menú de navegación
│   └── app.module.ts               # FormsModule + AngularFireModule
├── environments/                   # Configuración de Firebase
└── styles.css                      # Estilos globales
```

## Firestore

- Proyecto: `LifeGoals`
- Colección: `metas`
- Campo: `meta` (string)
- Reglas de seguridad: [`firestore.rules`](firestore.rules)

## Desarrollo local

```bash
npm install
npm start          # http://localhost:4200
npm test           # pruebas unitarias
npm run build      # compilación de producción en dist/lifegoals
```

## Docker

```bash
docker build -t lifegoals .
docker run -p 8080:80 lifegoals   # http://localhost:8080
```

El contenedor escucha en la variable `PORT` (80 por defecto), compatible con Render.

## Despliegue continuo

El workflow [`.github/workflows/docker-image.yml`](.github/workflows/docker-image.yml) se ejecuta con cada push a `master`:

1. Construye la imagen Docker del proyecto.
2. La publica en Docker Hub como `darksider8888/lifegoals:latest`.
3. (Opcional) Dispara el redespliegue en Render.

Secrets requeridos en el repositorio: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN` y, opcionalmente, `RENDER_DEPLOY_HOOK_URL`.
