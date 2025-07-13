import { useEffect, useState } from "react";
import { listarClientes } from "../../services/clienteService";
import { useNavigation } from "simple-react-routing";

export default function HomePage() {
const [clientes, setClientes] = useState([]);

    const [search, setSearch] = useState("");

    const { navigateTo } = useNavigation();

    const fetchData = async () => {
        const resultado = await listarClientes(search);
        if (resultado.status == 200) {
            setClientes(resultado.data);
        }
    }

    useEffect(() => {
        // debounce
        var timeout = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, [search]);

    return <div>
        home page
    </div>
}