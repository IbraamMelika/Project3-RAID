import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import FavoriteButton from './FavoriteButton';
import WatchlistButton from './WatchlistButton';
import RowRetry from './RowRetry';
import requests from './requests';

test("'Favorite' button changes to 'Unfavorite' after Clicking it.", () => {
    
    const results = render(<FavoriteButton userEmail='avp76@njit.edu' media='Lupin' />);
    
    const favButton = screen.getByText('Favorite');
    fireEvent.click(favButton);
    
    const unfavButton = screen.getByText('Unfavorite');
    expect(favButton).toBe(unfavButton);
    
    fireEvent.click(unfavButton);
    expect(unfavButton).toBe(favButton);
    
});

test("'Add to watchlist' button shows drop down after Clicking it.", () => {
    
    const results = render(<WatchlistButton userEmail='avp76@njit.edu' media='Lupin' />);
    
    const watchlistButton = screen.getByText('Add to watchlist');
    fireEvent.click(watchlistButton);
    
    const closeWatchlistButton = screen.getByText('Close watchlist');
    expect(watchlistButton).toBe(closeWatchlistButton);
    
    fireEvent.click(closeWatchlistButton);
    expect(closeWatchlistButton).toBe(watchlistButton);
});

test("RowRetry Test", () => {
    
    const results = render(<RowRetry title="Documentaries" fetchURL={requests.fetchDocumentaries} userEmail='avp76@njit.edu' />);
    
    const Documentaries = screen.getByText('Documentaries');
    const HorrorMovies = "Horror Movies";
    const ComedyMovies = "Comedy Movies";

    expect(Documentaries).toBeInTheDocument();
    expect(Documentaries).not.toBe(HorrorMovies);
    expect(Documentaries).not.toBe(ComedyMovies);

});
