import { EditCaisseForm } from "./EditCaisseForm";

const getCaisseById = async (id) => {
    try {
        const res = await fetch(`/api/topics/${id}`, {
          cache: "no-store",
        });
    
        if (!res.ok) {
          throw new Error("Failed to fetch caisse");
        }
    
        return res.json();
      } catch (error) {
        console.log(error);
      }
}

export default async function CaisseEdit ({params}) {
    const { id } = params
    const { caisse } = await getCaisseById(id)
    const {nom} = caisse

    return (
      <div className="container pt-6 bg-gray-900 h-screen">
        <h2 className="text-2xl text-white font-bold mb-2">Ajouter une caisse</h2>
        <EditCaisseForm id={id} nom={nom}></EditCaisseForm>
      </div>
    )
  }