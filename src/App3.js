import React, {useState, useEffect, useCallback, useMemo} from "react";
import axios from 'axios';

//Container
function App3() {
    // 변수 설정 : useState
    const [music, setMusic]=useState([]);
    const [ss, setSs]=useState("");
    // 변수 초기값 : useEffect
    useEffect(()=>{
        axios.get('http://localhost:3000/music.json').then((res)=>{
            setMusic(res.data);
            
        })
    }, []) // mount할때마다 실행 => componentDidMount, componentDidUpdate

    // 이벤트 등록
    const handleUserInput=useCallback((ss)=>{
        setSs(ss);
    },[ss]) //ss: 입력한 단어 => ss가 변경될때만 호출
    
    return(
   <div className={"row"}>
    <H2/>
    <SearchBar ss={ss} onUserInput={handleUserInput}/>
    <div style={{"height":"50px"}}></div>
    <MusicTable music={music} ss={ss}/>
   </div>

    )

}

/*
    var s= "abcdefg";
    var n = s.indexOfd(a);
    var n = s.indexOfd(k); => -1
    n = 0;

    CallBack : 함수의 주소를 기억함
    Memo : 함수의 리턴문을 기억함
 */

function MusicTable(props) {
    let row=[];
    props.music.forEach((m)=>{
        if(m.title.indexOf(props.ss)==-1){
            return;
        }

        // 배열의 추가
        row.push(<MusicRow music={m}/>);
    })

    return(
        <table className={"table"}>
            <thead>
            <tr className={"danger"}>
                <th>순위</th>
                <th></th>
                <th>노래명</th>
                <th>가수명</th>
            </tr>
            </thead>
            <tbody>
            {row}
            </tbody>
        </table>
    )
}

function MusicRow(props) {
    return(
        <tr>
            <td>{props.music.rank}</td>
            <td><img src={props.music.poster} width={"30"} height={"30"}/> </td>
            <td>{props.music.title}</td>
            <td>{props.music.singer}</td>

        </tr>
    )
}

function SearchBar(props) {
    //useCallback
    const onChange=(e)=>{
        props.onUserInput(e.target.value);  // App3
    }
    return(
        <table className={"table"}>
            <tr>
                <td>
                    <input type={"text"} size={"25"} className={"input-sm"}
                    placeholder={"Search"} onChange={onChange} value={props.ss}
                    />
                </td>
            </tr>

        </table>
    )
}

// memo 안 씀
const H=()=>{
    //momo
    const color = ["red", "blue", "green", "yellow", "pink"];
    const no = parseInt(Math.random()*5);
    // Math.random() => 0.0 ~ 0.99 => 5*0.0 ~ 0.99*5 ==> 4.999
    // 0 ~ 4
    return(
        <h1 className={"text-center"} style={{"color":color[no]}}>Music Top 50</h1>
    )
}

// memo 씀
const H2=React.memo(()=>{
    const color = ["red", "blue", "green", "yellow", "pink"];
    const no = parseInt(Math.random()*5);
    // Math.random() => 0.0 ~ 0.99 => 5*0.0 ~ 0.99*5 ==> 4.999
    // 0 ~ 4
    return(
        <h1 className={"text-center"} style={{"color":color[no]}}>Music Top 50</h1>
    )

});

export default App3;