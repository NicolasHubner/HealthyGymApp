module.exports = {
    root: true,
    extends: '@react-native-community',
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'unused-imports'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': [
            'warn',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/no-shadow': ['error'],
                'no-shadow': 'off',
                'no-undef': 'off',
                'comma-dangle': 'off',
                'react-native/no-inline-styles': 'off',
                'react/react-in-jsx-scope': 'off',
                curly: 'off',
            },
        },
    ],
};
