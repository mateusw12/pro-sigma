import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Hero = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
`;

export const Subtitle = styled.p`
  font-size: 20px;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.9);
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FeatureSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 60px;
  max-width: 1000px;
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h3 {
    color: #1890ff;
    font-size: 20px;
    margin: 16px 0;
  }

  p {
    color: #666;
    font-size: 14px;
  }
`;
