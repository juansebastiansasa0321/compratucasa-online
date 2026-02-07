import ImageMosaic from "@/components/ImageMosaic";
import PropertyMainInfo from "@/components/PropertyMainInfo";
import { getProperties } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const properties = await getProperties();
  const currentProperty = properties[0];

  if (!currentProperty) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">No hay propiedades disponibles.</h1>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Mosaico de Imágenes Estilo Portal */}
      <ImageMosaic images={currentProperty.images} />

      {/* Información Principal y Sidebar */}
      <PropertyMainInfo property={currentProperty} />

      {/* Sección de otras propiedades (si existen) */}
      {properties.length > 1 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Otras Propiedades Destacadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.slice(1).map((property) => (
                <div key={property.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow group">
                  <div className="relative h-64 w-full overflow-hidden">
                    {property.heroImage ? (
                      <Image src={property.heroImage} alt={property.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">Sin imagen</div>
                    )}
                    <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
                      EN VENTA
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-1 truncate">{property.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 truncate">{property.location}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-emerald-600 font-bold text-lg">{property.price}</span>
                      <Link href={`/?id=${property.id}`} className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition">
                        Ver
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer simple en lugar de Contact grande (ya que está en sidebar) */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p className="mb-4 text-gray-400">© 2026 Inmobiliaria Moderna. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <span>Términos y Condiciones</span>
          <span>Política de Privacidad</span>
        </div>
      </footer>
    </main>
  );
}
