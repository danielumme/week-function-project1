import React, {useState, useEffect} from "react";
import axios from 'axios';

export default function App4() {
    const [news, setNews]=useState([]);
    const [pop, setPop]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3355/movie_news').then((res)=>{
            setNews(res.data);
        })
    }, [])

    useEffect(()=>{
        axios.get('http://localhost:3355/movie_pop').then((res)=>{
            setPop(res.data);
        })
    }, [])

    const movie_news = news.map((m)=>
        <table className={"table"}>
            <tbody>
                <tr>
                    <td width={"30"} className={"text-center"} rowSpan={"3"}>
                        <img src={m.poster.substring(0,m.poster.lastIndexOf(")"))} width={"100%"} />
                    </td>
                    <td width={"70%"}>
                        <a href={m.link}><b>{m.title}</b></a>
                    </td>
                </tr>
            <tr>
                <td width={"70%"}>{m.content}</td>

            </tr>
            <tr>
                <td width={"70%"} className={"text-right"}>{m.author}</td>
            </tr>
            </tbody>
        </table>

    )
    return(
        <div className={"row"}>
            <div className={"col-sm-8"}>
                <table className={"table"}>
                    <tbody>
                        <td>
                            {movie_news}
                        </td>
                    </tbody>
                </table>
            </div>

            <div className={"col-sm-4"}>

            </div>

        </div>
    )
}
