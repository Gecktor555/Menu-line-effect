"use strict"


//otrymuemo masyw elementiv
const menuLinksWrappers = document.querySelectorAll('[data-line-effect]');
//jaksho e elementy zapuskaemo function
menuLinksWrappers.length ? menuEffect() : null;

//Osnowna function
function menuEffect() {
	//perebir elementiw ta poshuk punktiw menu
	menuLinksWrappers.forEach(menuLinksWrapper => {
		const menuLinks = menuLinksWrapper.querySelectorAll('a');
		//otrymuemo shwydkist effectu
		const effectSpeed = menuLinksWrapper.dataset.lineEffect ? menuLinksWrapper.dataset.lineEffect : 200;
		//jaksho e punkty menu , zapuskajemo function
		menuLinks.length ? menuEffectItem(menuLinks, effectSpeed) : null;
	});

	function menuEffectItem(menuLinks, effectSpeed) {
		//Perelik constant zi styljamy riznyh staniw
		const effectTransition =`transition: transform ${effectSpeed}ms ease;`;
		const effectHover = `transform: translate3d(0px, 0%, 0px);`;
		const effectTop = `transform: translate3d(0px, -100%, 0px);`;
		const effectBottom = `transform: translate3d(0px, 100%, 0px);`;
	
		//Perewirka elementiw ta dodawannja HTML-kodu dla roboty effectu
		menuLinks.forEach(menuLink => {
			menuLink.insertAdjacentHTML('beforeend', `
			<span style="transform: translate3d(0px, 100%, 0px);" class="hover">
				<span style="transform: translate3d(0px, -100%, 0px);" class="hover__text">${menuLink.textContent}</span>
			</span>
			`);
			//Pry wynykneni podiy nawedennja ta perewedennja kursoru
			//wyklykaemo function menuLinkActions()
			menuLink.onmouseenter = menuLink.onmouseleave = menuLinkActions; 
		});
		
	
		//Pry nawedenni kursoru
		function menuLinkActions(e) {
			const menuLink = e.target;
			const menuLinkItem = menuLink.querySelector('.hover');
			const menuLinkText = menuLink.querySelector('.hover__text');

			//otrymannja polowyny wysoty elementu
			const menuLinkHeight = menuLink.offsetHeight / 2;
			//otrymannja pozycij kursoru pry wzaemodij z elementom
			const menuLinkPos = e.pageY - (menuLink.getBoundingClientRect().top + scrollY);

			//Pry nawedenni kursora
			if (e.type === 'mouseenter') {
				//w zaleznosti wid pozycij kursoru dodaemo pewni styli
				menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom : effectTop;
				menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop : effectBottom;
				//z pewnoju zatrymkoju zaminjaemo styli ta widobrazaemo effect
				setTimeout(() => {
					menuLinkItem.style.cssText = effectHover + effectTransition;
					menuLinkText.style.cssText = effectHover + effectTransition;
				},5);
			}
			//pry perewedenni kursoru
			if (e.type === 'mouseleave') {
				//w zaleznosti wid pozycij kursoru dodaemo pewni styli
				menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom + effectTransition : effectTop + effectTransition;
				menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop + effectTransition : effectBottom + effectTransition;
			}
		}
	}
} 
