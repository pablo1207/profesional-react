import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Link } from 'react-router-dom';

export const Navbar: React.ForwardRefExoticComponent<NavbarProps & React.RefAttributes<any>> =
    forwardRef(
        ({ onSearch },
            ref
        ): React.JSX.Element => {
            const [search, setSearch] = useState<string>('');

            useImperativeHandle(ref, () => ({
                search,
            }));

            const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
                const { value } = event.target;
                setSearch(value);
            };

            const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
                event.stopPropagation();
                if (event.key === 'Enter') {
                    onSearch(search)
                }
            };

            return (
                <div ref={ref} style={{
                    marginBottom: 14,
                    width: '100%',
                    display: 'flex',
                }}>
                    <div style={{ flex: 1, display: 'flex' }}>
                        <p
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>Mi boletera</p>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderRadius: '4px' }}>
                        <input
                            placeholder="searching favorite event"
                            onChange={handleInputChange}
                            value={search}
                            onKeyDown={handleInputKeyDown}
                            style={{
                                fontSize: 16,
                                padding: '6px 12px',
                                borderRadius: 4,
                                border: 'none',
                                width: 200
                            }} />
                        <Link to={'/profile/my-info'} style={{ marginLeft: 24, color: 'black', textDecoration: 'none' }}> Mi perfil</Link>
                    </div>
                </div>
            )
        });

Navbar.displayName = 'Navbar';

interface NavbarProps {
    onSearch: (term: string) => void
}