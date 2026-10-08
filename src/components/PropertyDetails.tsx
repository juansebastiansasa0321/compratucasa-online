import { Property } from "@/data/properties";

interface PropertyDetailsProps {
    property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
    const details = [
        { label: "Tipo de Inmueble", value: property.propertyType, fallback: "No especificado" },
        { label: "Estado", value: property.status, fallback: "Usado" },
        { label: "Habitaciones", value: property.bedrooms, fallback: "0" },
        { label: "Baños", value: property.bathrooms, fallback: "0" },
        { label: "Parqueaderos", value: property.parkingSpaces, fallback: "0" },
        { label: "Antigüedad", value: property.age, fallback: "No especificado" },
        { label: "Área Construida", value: property.builtArea ? `${property.builtArea} m2` : undefined, fallback: "0 m2" },
        { label: "Área Privada", value: property.privateArea ? `${property.privateArea} m2` : undefined, fallback: "0 m2" },
        { label: "Estrato", value: property.stratum, fallback: "No especificado" },
        { label: "Administración", value: property.adminFee, fallback: "$ 0" },
        { label: "Piso N°", value: property.floorNumber, fallback: "0" },
        { label: "Cantidad de Pisos", value: property.totalFloors, fallback: "1" },
        { label: "Acepta permuta", value: property.acceptsBarter, fallback: "No" },
        { label: "Remodelado", value: property.remodeled, fallback: "No" },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 border-b pb-4">Detalles de la Propiedad</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-4">
                {details.map((detail, idx) => (
                    <div key={idx} className="flex flex-col space-y-1">
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                            {detail.label}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                            {detail.value ?? detail.fallback}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
