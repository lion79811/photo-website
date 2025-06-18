import { render, screen, fireEvent } from '@testing-library/react';
import HeaderBanner from '@/components/HeaderBanner';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('HeaderBanner', () => {
  it('渲染标题和按钮', () => {
    render(<HeaderBanner onRepairClick={() => {}} onPosterClick={() => {}} onArrowClick={() => {}} />);
    
    expect(screen.getByText(/拾起每一缕时光/)).toBeInTheDocument();
    expect(screen.getByText(/老照片修复/)).toBeInTheDocument();
    expect(screen.getByText(/手抄报设计/)).toBeInTheDocument();
  });

  it('点击按钮触发导航', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    
    render(<HeaderBanner onRepairClick={() => mockNavigate('/#case-showcase?tab=repair')} 
                        onPosterClick={() => mockNavigate('/#case-showcase?tab=poster')} 
                        onArrowClick={() => {}} />);
    
    fireEvent.click(screen.getByText(/老照片修复/));
    expect(mockNavigate).toHaveBeenCalledWith('/#case-showcase?tab=repair');
    
    fireEvent.click(screen.getByText(/手抄报设计/));
    expect(mockNavigate).toHaveBeenCalledWith('/#case-showcase?tab=poster');
  });
});
