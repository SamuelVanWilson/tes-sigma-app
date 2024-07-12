document.addEventListener('DOMContentLoaded', function(){
    const viewPoinSigma = document.getElementById('viewSigma')
    const poinBars = document.querySelectorAll('.poinBar');
    const formUser = document.querySelector('form')
    const originalValuesPoin = [];
    let nama;
    let intervalId;

    formUser.addEventListener('submit', e => {
      e.preventDefault()
      const formData = new FormData(formUser);
      nama = formData.get('nama').toLowerCase()
      console.log(nama);
      viewPoinSigma.style.setProperty('display', 'block')
      formUser.style.setProperty('display', 'none')
      document.querySelector('#viewSigma>h1').innerHTML = nama
      let userData = JSON.parse(localStorage.getItem('userData')) || {};

        setTimeout(() => {
          if (userData[nama]) {
            console.log(userData[nama])
            userData[nama].forEach(poinUser => {
              originalValuesPoin.push(poinUser)
            });
            poinBars.forEach(function(poinBar, index) {
              let value = originalValuesPoin[index]
              poinBar.style.width = value + '%';
              setTimeout(() => {
                poinBar.innerHTML = value;
              }, 200);
            });
          } else {
            poinBars.forEach(function(poinBar, index) {
              let randomValue = randomPoin(index);
              originalValuesPoin[index] = randomValue;
              console.log(originalValuesPoin[index])
              poinBar.style.width = randomValue + '%';
              setTimeout(() => {
                poinBar.innerHTML = randomValue + '%';
              }, 200);
            });
            console.log(userData);
            userData[nama] = originalValuesPoin;
            localStorage.setItem('userData', JSON.stringify(userData));
          }
          document.getElementById('persona').textContent = randomPersona()
        }, 400);

      if(!intervalId) {
        intervalId = setInterval(function() {
          console.log('woi');
          poinBars.forEach(function(poinBar, index) {
            const originalValue = originalValuesPoin[index];
            if (parseInt(poinBar.style.width) !== originalValue) {
              poinBar.style.width = originalValue + '%';
              poinBar.textContent = originalValue + '%';
            }
          });
        }, 1000);
    }
    })



    document.querySelector('button[type="button"]').addEventListener('click', function () {
      clearInterval(intervalId)
      originalValuesPoin.length = 0;
      poinBars.forEach(poinBar => {
        poinBar.style.width = 0 + '%' 
        poinBar.innerHTML = ''
      });
      viewPoinSigma.style.setProperty('display', 'none');
      formUser.style.setProperty('display', 'block')
    })

    function randomPoin(targetIndex){
        if (targetIndex !== 4) {
          let randomValue
          let kemungkinan = Math.random();
          let poinAcak = Math.random();
          
          if (kemungkinan < 0.75) {
          randomValue = 30 + Math.pow(poinAcak, 2) * 70;
          } else {
          randomValue = 17 + Math.sqrt(poinAcak) * 47;
          }
          randomValue = Math.floor(randomValue)

          if (randomValue > 80) {
          randomValue = Math.floor(Math.pow(poinAcak, 2) * 20) + 70;
          }
          return randomValue;
        } else {
          let result = Math.round(originalValuesPoin.reduce((angkaDitarget, angkaTempatHasil) => angkaDitarget + angkaTempatHasil, 0) / 4)
          return result
        }
    }
    
    function randomPersona() {
      let karakter = []
      console.log(originalValuesPoin[0]);
      console.log(originalValuesPoin[1]);
      if ( originalValuesPoin[0] <= 20) {
        karakter.push('cringe kuadrat dikali jamet')
      } else if (originalValuesPoin[0] >= 20 && originalValuesPoin[0] <= 30) {
        karakter.push('bocah pickme sok imut')
      } else if (originalValuesPoin[0] >= 30 && originalValuesPoin[0] <= 50) {
        karakter.push('npc nolep')
      } else if (originalValuesPoin[0] >= 50 && originalValuesPoin[0] <= 60) {
        karakter.push('wibu bau bawang')
      } else if (originalValuesPoin[0] >= 60 && originalValuesPoin[0] <= 70) {
        karakter.push('bocah dark system')
      } else if (originalValuesPoin[0] >= 70 && originalValuesPoin[0] <= 80) {
        karakter.push('rajin dan suka membantu orang')
      } else if (originalValuesPoin[0] >= 80 && originalValuesPoin[0] <= 90) {
        karakter.push('remaja generasi emas 2040')
      }else {
        karakter.push('the next presiden 2028')
      }
      
      if ( originalValuesPoin[1] <= 20) {
        karakter.push('bocah akward')
      } else if (originalValuesPoin[1] >= 20 && originalValuesPoin[1] <= 30) {
        karakter.push('freak dan gak nyaman')
      } else if (originalValuesPoin[1] >= 30 && originalValuesPoin[1] <= 50) {
        karakter.push('normal')
      } else if (originalValuesPoin[1] >= 50 && originalValuesPoin[1] <= 60) {
        karakter.push('rapih dan wangi tapi thoriq umur 2 bulan dah haji')
      } else if (originalValuesPoin[1] >= 60 && originalValuesPoin[1] <= 70) {
        karakter.push('kangenin')
      } else if (originalValuesPoin[1] >= 70 && originalValuesPoin[1] <= 80) {
        karakter.push('karismatik')
      } else if (originalValuesPoin[1] >= 80 && originalValuesPoin[0] <= 90) {
        karakter.push('manipulatif dan bikin ketar ketir')
      }else {
        karakter.push(' sangat dihormatin dan rispek ')
      }
      console.log(karakter)
      return karakter
    }
})