import React, {useState, useContext, useEffect, useCallback} from 'react';

// 1. GANTI URL: Gunakan URL dari n8n Webhook Anda
// Gunakan /webhook-test/ saat develop dan /webhook/ saat sudah aktif (Production)
const N8N_URL = "https://n8n.sukajaya.site/webhook/search-books?title=";

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("the lost world");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");

const fetchBooks = useCallback(async() => {
    setLoading(true);
    try {
        const response = await fetch(`${N8N_URL}${searchTerm}`);
        
        // Cek jika response sukses (status 200)
        if (!response.ok) {
            setBooks([]);
            setResultTitle("No Search Result Found!");
            setLoading(false);
            return;
        }

        const data = await response.json();
        const actualData = data.data || [];
        // 1. Pastikan data tidak null/undefined
        // 2. Ubah ke array jika n8n mengirim objek tunggal
        //const dataArray = Array.isArray(data) ? data : (data && typeof data === 'object' ? [data] : []);

        // Periksa apakah dataArray benar-benar berisi item yang valid
        const dataArray = Array.isArray(actualData) ? actualData : (actualData && typeof actualData === 'object' ? [actualData] : []);

// 3. Mapping tetap sama menggunakan dataArray
if (dataArray.length > 0 && dataArray[0] !== null) {
    const newBooks = dataArray.map((bookSingle) => {
        return {
            id: bookSingle.id || 'no-id', 
            author: bookSingle.author || "Unknown Author",
            cover_id: bookSingle.cover_id,
            edition_count: bookSingle.edition_count,
            first_publish_year: bookSingle.year, 
            title: bookSingle.title || "Untitled"
        }
    });

    setBooks(newBooks);
    setResultTitle("Your Search Result");
} else {
    setBooks([]);
    setResultTitle("No Search Result Found!");
}
    } catch(error) {
        console.error("Fetch error:", error);
        setBooks([]);
        setResultTitle("No Search Result Found!");
    }
    setLoading(false);
}, [searchTerm]);

    useEffect(() => {
        fetchBooks();
    }, [searchTerm, fetchBooks]);

    return (
        <AppContext.Provider value = {{
            loading, books, setSearchTerm, resultTitle, setResultTitle,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};