import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Swiper from 'swiper';
import ScrollReveal from 'scrollreveal';

import '../assets/styles/homePage.css';
import '../assets/styles/swiper-bundle.min.css';

import logo from '../assets/images/logoConMusic-removebg-preview.png';
import navbar from '../assets/images/nav-light.png';
import imageHome from '../assets/images/drums-guitar-removebg-preview.png';
import ImageCreativity from '../assets/images/valor1-removebg-preview.png';
import ImageInovation from '../assets/images/valor2-removebg-preview.png';
import ImageColaboration from '../assets/images/valor3-removebg-preview.png';
import ImageGuitar from '../assets/images/3d-render-acoustic-guitar-with-music-headphone-3d-illustration-design-removebg-preview.png';
import ImageGuilherme from '../assets/images/avatarGui.png';
import ImageCleber from '../assets/images/avatarCleber.png';
import ImageJoao from '../assets/images/avatarJoao.png';
import ImagePedro from '../assets/images/avatarpedro.png';
import ImageVini from '../assets/images/avatarVini.png';
import ImageMessage from '../assets/images/message.png';
import ImageFooter from '../assets/images/logoConMusic-removebg-preview.png';
import Footer2 from '../assets/images/footer_2-removebg-preview.png';
import Footer1 from '../assets/images/footer_1-removebg-preview.png';

function HomePage() {
  const navigate = useNavigate();
  const howInstace = process.env.REACT_APP_HOW_INSTACE || 'local';

  useEffect(() => {
    const initMainScript = async () => {
      /*=============== Pegando valores do menu ===============*/
      const navMenu = document.getElementById('nav-menu');
      const navToggle = document.getElementById('nav-toggle');
      const navClose = document.getElementById('nav-close');

      /*===== Mostrando o menu =====*/
      /* validando se o menu existe */
      if (navToggle) {
        navToggle.addEventListener('click', () => {
          navMenu.classList.add('show-menu');
        });
      }

      // /*===== Escondendo o menu =====*/
      // /* validando se o menu existe */
      if (navClose) {
        navClose.addEventListener('click', () => {
          navMenu.classList.remove('show-menu');
        });
      }

      // /*=============== Removendo o menu no modo mobile ===============*/
      const navLink = document.querySelectorAll('.nav__link');

      function linkAction() {
        if (navLink) {
          navMenu.classList.remove('show-menu');
        }
      }

      if (navLink) {
        navLink.forEach((n) => n.addEventListener('click', linkAction));
      }

      // /*=============== Mudando a cor de fundo do header ===============*/
      function scrollHeader() {
        const header = document.getElementById('header');
        // Quando a rolagem for maior que 50 de altura da janela de visualização, adicione a classe scroll-header à tag do cabeçalho
          if (window.scrollY >= 50 && header) {
            header.classList.add('scroll-header');
          } else {
            header.classList.remove('scroll-header');
          }
          window.addEventListener('scroll', scrollHeader);
        }
        

      // /*=============== Carrosel ===============*/
      new Swiper('.new-swiper', {
        spaceBetween: 24,
        loop: true,
        slidesPerView: 3,
        centeredSlides: true,

        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        breakpoints: {
          992: {
            spaceBetween: 80,
          },
        },
      });

      // /*=============== Ativando o link atráves do scroll ===============*/
      const sections = document.querySelectorAll('section[id]');

      function scrollActive() {
        const scrollY = window.pageYOffset;
        if (sections) {
          sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
  
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
              document.querySelector(`.nav__menu a[href*="${sectionId}"]`).classList.add('active-link');
            } else {
              document.querySelector(`.nav__menu a[href*="${sectionId}"]`).classList.remove('active-link');
            }
          });
        }
        window.addEventListener('scroll', scrollActive);
      }


      // /*=============== Mudando a cor do botão de rolagem para cima ===============*/
      function scrollUp() {
        const scrollUp = document.getElementById('scroll-up');
        // Quando a rolagem for superior a 350 de altura da janela de visualização, adicione a classe show-scroll à tag a com a classe scroll-top
        
       
        if (window.scrollY >= 350 && scrollUp) {
          scrollUp.classList.add('show-scroll');
        } 
        else {
          scrollUp.classList.remove('show-scroll');
        };
        window.addEventListener('scroll', scrollUp);
      }


      // /*=============== Tema escuro ===============*/
      const themeButton = document.getElementById('theme-button');
      const darkTheme = 'dark-theme';
      const iconTheme = 'bx-sun';

      // // Tópico previamente selecionado (se selecionado pelo usuário)
      const selectedTheme = localStorage.getItem('selected-theme');
      const selectedIcon = localStorage.getItem('selected-icon');

      // // Obtemos o tema atual que a interface possui validando a classe dark-theme
      const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? 'dark' : 'light');
      const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun');

      // // Validamos se o usuário escolheu previamente um tema
      if (selectedTheme) {
        // Se a validação for cumprida, perguntamos qual era o problema para saber se ativamos ou desativamos o dark
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme);
      }

      // // Ative/desative o tema manualmente com o botão
      themeButton.addEventListener('click', () => {
        // Adicione ou remova o tema escuro/ícone
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        // Salvamos o tema e o ícone atual que o usuário escolheu
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
      });

      // /*=============== Exibindo a animação através do scroll ===============*/
      const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400,
      });

      sr.reveal('.home__img, .new__container, .footer__container');
      sr.reveal('.home__data', { delay: 500 });
      sr.reveal('.giving__content, .gift__card', { interval: 100 });
      sr.reveal('.celebrate__data, .message__form, .footer__img1', { origin: 'left' });
      sr.reveal('.celebrate__img, .message__img, .footer__img2', { origin: 'right' });
    };

    initMainScript();
  }, []);

  return (
    <div>
      <header className="header" id="header">
        <nav className="nav container">
          <a href="/#" className="nav__logo">
            <img src={logo} alt="" className="nav__logo-img" />
          </a>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="/#home" className="nav__link active-link">Home</a>
              </li>
              <li className="nav__item">
                <a href="/#sobre" className="nav__link">Sobre</a>
              </li>
              <li className="nav__item">
                <a href="/#integrantes" className="nav__link">Integrantes</a>
              </li>
            </ul>

            <div className="nav__close" id="nav-close">
              <i className='bx bx-x' ></i>
            </div>

            <img src={navbar} alt="" className="nav__img" />
          </div>
          <div className="nav__btns">
            <i className='bx bx-moon change-theme' id="theme-button"></i>

            <div className="nav__toggle" id="nav-toggle">
              <i className='bx bx-grid-alt' ></i>
            </div>
          </div>

        </nav>
      </header>

      <main className="main">
        <section className="home" id="home">
          <div className="home__container container grid">
            <img src={imageHome} alt="" className="home__img" />

            <div className="home__data">
              <h1 className="home__title">Uma plataforma perfeita para artistas e casas de show se conectarem.</h1>
              <p className="home__description">
                A ConMusic é uma plataforma inovadora que conecta artistas
                e casas de show, facilitando o processo de encontrar e trabalhar juntos.
                <br />
                <br />
                <button onClick={() => { navigate('/register') }} className="button" style={{ marginRight: '20px' }}>Cadastrar-se</button>
                <button onClick={() => { navigate('/login') }} className="buttonLogin">Login</button>
              </p>
            </div>
          </div>
        </section>

        <section className="giving section container">
          <h2 className="section__title">
            Valores
          </h2>

          <div className="giving__container grid">
            <div className="giving__content">
              <img src={ImageCreativity} alt="" className="giving__img" />
              <h3 className="giving__title">Criatividade</h3>
              <p className="giving__description">Sempre gerando novas ideias.</p>
            </div>

            <div className="giving__content">
              <img src={ImageInovation} alt="" className="giving__img" />
              <h3 className="giving__title">Inovação</h3>
              <p className="giving__description">Inventividade para solucionar problemas e inovar.</p>
            </div>

            <div className="giving__content">
              <img src={ImageColaboration} alt="" className="giving__img" />
              <h3 className="giving__title">Colaboração</h3>
              <p className="giving__description">Trabalho em equipe para alcançar objetivos comuns.</p>
            </div>
          </div>
        </section>

        <section className="celebrate section container" id="sobre">
          <div className="celebrate__container grid">
            <div className="celebrate__data">
              <h2 className="section__title celebrate__title">
                Junte-se à nossa comunidade e <br /> comece a encontrar seu próximo show hoje!
              </h2>
              <p className="celebrate__description">
                Com anos de experiência em conectar pessoas, somos apaixonados
                por ajudar a construir carreiras de artistas e fornecer aos locais uma seleção
                de artistas de alta qualidade para escolher.
              </p>
              <a href="/#" className="button">Envie uma sugestão</a>
            </div>

            <img src={ImageGuitar} alt="" className="celebrate__img" />
          </div>
        </section>

        <section className="team section container" id="integrantes">
          <h2 className="section__title">Integrantes</h2>

          <div className="new__container">
            <div className="swiper new-swiper">
              <div className="swiper-wrapper">
                <article className="new__card swiper-slide">
                  <div className="new__overlay"></div>

                  <img src={ImageGuilherme} alt="" className="new__img" />
                  <h3 className="new__price">Guilherme</h3>
                  <span className="new__title">Dev</span>

                  <a href="https://github.com/GuilhermeAlvesBarros" className="button new__button">
                    <i className='bx bxl-github' ></i>
                  </a>
                </article>

                <article className="new__card swiper-slide">
                  <div className="new__overlay"></div>

                  <img src={ImageCleber} alt="" className="new__img" />
                  <h3 className="new__price">Cleber</h3>
                  <span className="new__title">Design</span>

                  <a href="https://github.com/cleber2010" className="button new__button">
                    <i className='bx bxl-github' ></i>
                  </a>
                </article>

                <article className="new__card swiper-slide">
                  <div className="new__overlay"></div>

                  <img src={ImageJoao} alt="" className="new__img" />
                  <h3 className="new__price">João</h3>
                  <span className="new__title">Gerente de produto</span>

                  <a href="https://github.com/Joao-Miziaras" className="button new__button">
                    <i className='bx bxl-github' ></i>
                  </a>
                </article>

                <article className="new__card swiper-slide">
                  <div className="new__overlay"></div>

                  <img src={ImagePedro} alt="" className="new__img" />
                  <h3 className="new__price">Pedro</h3>
                  <span className="new__title">Analista de dados</span>

                  <a href="https://github.com/Pedro-Jsn" className="button new__button">
                    <i className='bx bxl-github' ></i>
                  </a>
                </article>


                <article className="new__card swiper-slide">
                  <div className="new__overlay"></div>

                  <img src={ImageVini} alt="" className="new__img" />
                  <h3 className="new__price">Vinicius</h3>
                  <span className="new__title">Gerente de projeto</span>

                  <a href="https://github.com/VS-Sousa" className="button new__button">
                    <i className='bx bxl-github' ></i>
                  </a>
                </article>
              </div>

              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>

        <section className="message section container">
          <div className="message__container grid">
            <form action="" className="message__form">
              <h2 className="message__title">Mande boas <br /> mensagens!</h2>
              <input type="email" placeholder="Escreva sua mensagem" className="message__input" />
              <button className="button message__button">Enviar</button>
            </form>

            <img src={ImageMessage} alt="" className="message__img" />
          </div>
        </section>

      </main>

      <footer className="footer section">
        <div className="footer__container container grid">
          <div className="footer__description_site">
            <a href="/#" className="footer__logo">
              <img src={ImageFooter} alt="" className="footer__logo-img" />

            </a>

            <p className="footer__description">
              Com ConMusic artistas
              e casas de show<br />
              podem se conectar em um único lugar.
            </p>
          </div>

          <div>
            <h3 className="footer__title">Outros servirços</h3>

            <ul className="footer__links">
              <li>
                <a href="/#" className="footer__link">Preços</a>
              </li>
              <li>
                <a href="/#" className="footer__link">Descontos</a>
              </li>
              <li>
                <a href="/#" className="footer__link">Sobre</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer__title">Suporte</h3>

            <ul className="footer__links">
              <li>
                <a href="/#" className="footer__link">FAQs</a>
              </li>
              <li>
                <a href="/#" className="footer__link">Centro de suporte</a>
              </li>
              <li>
                <a href="/#" className="footer__link">Contate-nos</a>
              </li>
            </ul>
          </div>

          <img src={Footer2} alt="" className="footer__img2" />
          <img src={Footer1} alt="" className="footer__img1" />
        </div>

        <span className="footer__copy">Feito com <i className='bx bx-heart'></i> por CONMUSIC - {howInstace}</span>
      </footer>

      <a href="/#" className="scrollup" id="scroll-up">
        <i className='bx bx-up-arrow-alt scrollup__icon' ></i>
      </a>
    </div>
  );
}

export default HomePage;