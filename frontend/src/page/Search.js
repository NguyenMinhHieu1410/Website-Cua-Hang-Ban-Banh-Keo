import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CardFeature from '../component/CardFeature';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/search?query=${query}`);
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    const loadingArrayFeature = new Array(10).fill(null);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-slate-600">Kết quả tìm kiếm cho: "{query}"</h2>
            {results.length > 0 ? (
                 <div className="flex flex-wrap justify-center gap-4 my-4">
                 {results[0]
                   ? results.map((el) => {
                     return (
                       <CardFeature
                         key={el._id}
                         id={el._id}
                         image={el.image}
                         name={el.name}
                         category={el.category}
                         price={el.price}
                       />
                     );
                   })
                   :
                   loadingArrayFeature.map((el, index) => (
                     <CardFeature loading="Loading..." key={index + "allProduct"} />
                   ))}
               </div>
            ) : (
                <p className="mt-4">Không tìm thấy kết quả phù hợp.</p>
            )}
        </div>
    );
};

export default SearchResults;
