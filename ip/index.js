//axios import buraya gelecek
import axios from "axios";
var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
  return benimIP;
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/

/*

	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek
let newIp;
let ipAddress = ipAdresimiAl().then((response) => {
  axios
    .get(`https://apis.ergineer.com/ipgeoapi/${response}`)

    .then((response) => {
      const cardsDiv = document.querySelector(".cards");
      cardsDiv.appendChild(domMaker(response.data));
    });

  function domMaker(newObject) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    const photo = document.createElement("img");
    photo.src = newObject.ülkebayrağı;
    cardDiv.appendChild(photo);

    const cardInfoDiv = document.createElement("div");
    cardInfoDiv.classList.add("card-info");

    const h3 = document.createElement("h3");
    h3.className = "ip";
    h3.textContent = newObject.sorgu;
    cardInfoDiv.appendChild(h3);

    const ulke = document.createElement("p");
    ulke.classList.add("ulke");
    ulke.textContent = `${newObject.ülke} (${newObject.ülkeKodu})`;
    cardInfoDiv.appendChild(ulke);

    const enlem = document.createElement("p");
    enlem.textContent = `Enlem: ${newObject.enlem} Boylam: (${newObject.boylam})`;
    cardInfoDiv.appendChild(enlem);

    const sehir = document.createElement("p");
    sehir.textContent = newObject.şehir;
    cardInfoDiv.appendChild(sehir);

    const saat = document.createElement("p");
    saat.textContent = newObject.saatdilimi;
    cardInfoDiv.appendChild(saat);

    const para = document.createElement("p");
    para.textContent = newObject.parabirimi;
    cardInfoDiv.appendChild(para);

    const isp = document.createElement("p");
    isp.textContent = newObject.isp;
    cardInfoDiv.appendChild(isp);

    cardDiv.appendChild(cardInfoDiv);

    return cardDiv;
  }
});
