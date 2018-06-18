export const loadState = () => {
	try{
			const data = localStorage.getItem('state');
			if(data === null) {
				return undefined;
			} 
			console.log('localstorage read win');
			return JSON.parse(data);
	}
	catch(error){ 
		console.log('localstorage read error');
		return undefined;
	}
} 

export const saveState = (state) => {
	try{
		const data = JSON.stringify(state);
		localStorage.setItem('state', data);
		console.log('localstorage save win');
	}
	catch(error){
		console.log('localstorage write error');
		return undefined;
	}
}