import React from 'react';

const Content = ({title, gamelist, addGameToList}) => {

	let gamelistJSX = gamelist.map((value, i) => {
		return <li key={i}> {value} </li>
	});

  return (
    <div>
    	<p> {title} </p>
    	<div>
      	<input type="text" />
      	<button onClick={addGameToList}>추가</button>
      	<ul>{gamelistJSX}</ul>
    	</div>
    </div>
  );
}

export default Content ;