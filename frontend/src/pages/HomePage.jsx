import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="container">
        <h1 className="title">AI Business Platform</h1>
        <p className="subtitle">Выберите нужный инструмент</p>
        
        <div className="buttons-container">
          <button className="ai-button active" onClick={() => window.location.href = '/chat'}>
            <div className="button-icon">💬</div>
            <div>
              <h3>AI Chat</h3>
              <p>Умный ассистент с памятью</p>
            </div>
          </button>
          
          <button className="ai-button disabled">
            <div className="button-icon">⚡</div>
            <div>
              <h3>AI for Routine</h3>
              <p>Скоро доступно</p>
            </div>
          </button>
          
          <button className="ai-button disabled">
            <div className="button-icon">👥</div>
            <div>
              <h3>HR EcoSystem</h3>
              <p>Скоро доступно</p>
            </div>
          </button>
          
          <button className="ai-button disabled">
            <div className="button-icon">🚀</div>
            <div>
              <h3>AI Workspace</h3>
              <p>Скоро доступно</p>
            </div>
          </button>
        </div>
        
        <footer className="home-footer">
          <div className="footer-links">
            <a href="/privacy" className="footer-link">Политика конфиденциальности</a>
            <span className="footer-separator">•</span>
            <a href="/terms" className="footer-link">Условия использования</a>
          </div>
          <p className="footer-text">© 2025 Qabylda.com. Все права защищены.</p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;