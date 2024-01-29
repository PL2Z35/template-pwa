import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menu, Dropdown, Avatar, AutoComplete, Spin } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { get_All_Countries } from '../../config/petitions';

interface Country {
    country: string;
    flag_url: string;
}

const Country: React.FC = () => {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [countries, setCountries] = useState<Country[]>([]);
    const [options, setOptions] = useState<{ value: string; label: React.ReactNode }[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countriesData = await get_All_Countries();
                setCountries(countriesData);

                const countryOptions = countriesData.map((element: Country) => ({
                    value: element.country,
                    label: (
                        <div key={element.country}>
                            <Avatar
                                size="small"
                                src={element.flag_url}
                                style={{ marginRight: 8 }}
                            />
                            {element.country}
                        </div>
                    ),
                }));

                setOptions(countryOptions);

                const defaultCountry = countriesData.find(
                    (element: Country) => element.country === localStorage.getItem('country')
                );

                setSelectedImage(defaultCountry?.flag_url || "");
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchData();
    }, []);

    const updateCountry = (country: string) => {
        const selectedCountry: Country | undefined = countries.find(
            (element: Country) => element.country === country
        );

        if (selectedCountry) {
            setSelectedImage(selectedCountry.flag_url);
            localStorage.setItem('country', selectedCountry.country);

            router.push('/', undefined, { shallow: false }).then(() => {
                window.location.reload();
            });
        }
    };

    const handleSearch = (value: string) => {
        setOptions(
            !value
                ? []
                : countries
                    .filter((country: Country) =>
                        country.country.toLowerCase().includes(value.toLowerCase())
                    )
                    .map((country1: Country) => ({
                        value: country1.country,
                        label: (
                            <div key={country1.country}>
                                <Avatar
                                    size="small"
                                    src={country1.flag_url}
                                    style={{ marginRight: 8 }}
                                />
                                {country1.country}
                            </div>
                        ),
                    }))
        );
    };

    const onSelect = (value: string) => {
        updateCountry(value);
        setDropdownOpen(false);
    };

    const handleVisibleChange = (flag: boolean) => {
        setDropdownOpen(flag);
    };

    const menu = (
        <Menu>
            <Menu.Item key="autocomplete">
                <AutoComplete
                    dropdownMatchSelectWidth={200}
                    style={{ width: 200 }}
                    options={options}
                    onSelect={onSelect}
                    onSearch={handleSearch}
                    placeholder="Buscar país..."
                />
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="flex items-center gap-4">
            {countries.length === 0 ? (
                <Spin size="large" />
            ) : (
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    visible={dropdownOpen}
                    onVisibleChange={handleVisibleChange}
                >
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <Avatar
                            size="large"
                            icon={<UserOutlined />}
                            src={selectedImage}
                            style={{ marginRight: 8 }}
                        />
                    </a>
                </Dropdown>
            )}
        </div>
    );
};

export default Country;
