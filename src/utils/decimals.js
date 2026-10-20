/**
 * Централизованная конфигурация decimals для различных токенов и сетей
 */

// Decimals для различных окружений и сетей
export const DECIMALS_CONFIG = {
    // Для production окружения
    prod: {
        // Ethereum сеть (Mainnet)
        ETH: {
            USDT: 6,    // USDT на Ethereum имеет 6 decimals
            RUB: 6,     // Условная валюта RUB
            ETH: 18,    // Нативный ETH имеет 18 decimals
        },
        // Tron сеть (Mainnet)
        TRX: {
            USDT: 6,    // USDT на Tron имеет 6 decimals
            RUB: 6,     // Условная валюта RUB
            TRX: 6,     // Нативный TRX имеет 6 decimals
        },
        // HOT сеть
        HOT: {
            USDT: 6,   // HOT USDT
            RUB: 6,    // HOT RUB
        }
    },
    
    // Для test окружения (Sepolia и другие тестнеты)
    test: {
        // Ethereum сеть (Sepolia)
        ETH: {
            USDT: 18,   // Тестовый USDT может иметь 18 decimals
            RUB: 18,    // Тестовая валюта RUB
            ETH: 18,    // Нативный ETH имеет 18 decimals
        },
        // Tron сеть (Shasta/Nile)
        TRX: {
            USDT: 6,    // Тестовый USDT на Tron
            RUB: 6,     // Тестовая валюта RUB
            TRX: 6,     // Нативный TRX имеет 6 decimals
        },
        // HOT сеть
        HOT: {
            USDT: 18,   // HOT USDT
            RUB: 18,    // HOT RUB
        }
    }
}

/**
 * Получить decimals для указанной валюты в указанной сети и окружении
 * @param {string} env - Окружение ('prod' или 'test')
 * @param {string} network - Сеть ('ETH', 'TRX', 'HOT')
 * @param {string} currency - Валюта ('USDT', 'RUB', 'ETH', 'TRX')
 * @returns {number} Количество decimals
 */
export const getDecimals = (env, network, currency) => {
    const envConfig = DECIMALS_CONFIG[env] || DECIMALS_CONFIG.test
    const networkConfig = envConfig[network.toUpperCase()]
    
    if (!networkConfig) {
        console.warn(`Network ${network} not found in decimals config, using default`)
        return 18 // Дефолтное значение
    }
    
    const decimals = networkConfig[currency.toUpperCase()]
    
    if (decimals === undefined) {
        console.warn(`Currency ${currency} not found for network ${network}, using default`)
        return 18 // Дефолтное значение
    }
    
    return decimals
}