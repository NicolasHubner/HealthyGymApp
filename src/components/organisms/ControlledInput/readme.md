
  

## Controlled Input

@/components/organisms/ControlledInput

---

Um input controlado pelo React Hook Form.

Obs.: É necessário instanciar o React Hook Form (usando o useForm()) no componente pai deste input.

---

| Nome da prop. | Tipo | Padrão | Descrição
|--|--|--|--|--|
| ```hookFormValidations``` | FieldErrorsImpl | {} | Campos necessários para a validação do React Hook Form |
| ```isRequired``` | boolean | false | Indica se o input é requerido |
| ```inputName``` | string | '' | O nome para identificação |
| ```iconName``` | string | '' | O nome do ícone usando o grupo do MaterialCommunityIcons |
| ```placeholder``` | string | '' | O placeholder do input |
| ```keyboardType``` | KeyboardTypeOptions | 'default' | O tipo do teclado que será aberto |
| ```errorMessage``` | string | undefined | A mensagem de erro do input. Se não usar a propriedade, não será exibido erro |
| ```unitIndicator``` | string | undefined | Um indicador que aparece ao lado direito do input, com os caracteres passados na propriedade |
| ```render``` | ReactElement | undefined | Caso queira renderizar um componente no lugar do Input, basta passá-lo no parâmetro render |

---

**`render`**
| Nome da prop. | Tipo | Descrição
|--|--|--|--|--|
| ```onBlur``` | function | Função onBlur passada pelo React Hook Form |
| ```onChange``` | function | Função onChange passada pelo React Hook Form |
| ```value``` | string | O valor do input passado pelo React Hook Form |

---

**`hookFormValidations`**
| Nome da prop. | Tipo | Descrição
|--|--|--|--|--|
| ```control``` | any | Função control passada pelo React Hook Form |
| ```errors``` | FieldErrorsImpl | Função errors passada pelo React Hook Form |
