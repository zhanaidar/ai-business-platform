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
            <h3>AI Chat</h3>
            <p>Умный ассистент с памятью</p>
          </button>
          
          <button className="ai-button disabled">
            <div className="button-icon">⚡</div>
            <h3>AI for Routine</h3>
            <p>Скоро доступно</p>
          </button>
          
          <button className="ai-button disabled">
            <div className="button-icon">👥</div>
            <h3>HR EcoSystem</h3>
            <p>Скоро доступно</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;