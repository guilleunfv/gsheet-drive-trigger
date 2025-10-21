# gsheet-drive-trigger

## 📋 Visão Geral

Este projeto contém um script Google Apps Script que detecta automaticamente quando um link do Google (Drive, Planilhas, Documentos, etc.) é colado na coluna C de uma Google Planilha e cria uma cópia desse arquivo em uma pasta específica no Google Drive.

---

## 🚀 Como funciona

- Monitora edições na coluna C da planilha.
- Se o valor colado for um link válido do Google (Drive, Docs, Sheets, Slides, etc.), extrai o ID do arquivo.
- Busca ou cria uma pasta no Google Drive (por padrão chamada `analisis`).
- Cria uma cópia do arquivo dentro dessa pasta.
- Exibe um aviso de sucesso na planilha.

---

## 🛠️ Instalação e Configuração

1. **Copie o código para o Apps Script**
   - No Google Sheets, vá em **Extensões > Apps Script**.
   - Apague qualquer código existente e cole o script de `/src/script.gs`.
   - Salve o projeto.

2. **Crie o gatilho instalável**
   - No editor do Apps Script, clique no ícone de relógio ("Ativadores") no menu lateral.
   - Clique em **"+ Adicionar gatilho"**.
   - Escolha a função principal (ex: `onEditInstallable`).
   - Tipo de evento: **Ao editar**.
   - Salve e autorize as permissões solicitadas.

> **Atenção:** O nome da função pode ser qualquer um, desde que você selecione ela ao criar o gatilho.

---

## ⚙️ Personalização

### Alterar o nome da pasta de destino
No código, procure por:
var folder = getOrCreateFolder('analisis');

text
Troque `'analisis'` pelo nome desejado, por exemplo:
var folder = getOrCreateFolder('Relatorios 2025');

text

### Alterar a coluna monitorada
Por padrão:
if (column === 3) { // coluna C

text
Para monitorar outra coluna, troque o número:
- Coluna A = 1
- Coluna B = 2
- Coluna C = 3
- Coluna D = 4

### Alterar o nome da cópia criada
Por padrão:
var copiedFile = file.makeCopy(file.getName() + ' - Copia', folder);

text
Você pode personalizar:
var copiedFile = file.makeCopy(file.getName() + ' [BACKUP]', folder);

text
Ou adicionar a data:
var data = Utilities.formatDate(new Date(), "GMT-3", "yyyy-MM-dd");
var copiedFile = file.makeCopy(file.getName() + ' - ' + data, folder);

text

### Alterar o local da pasta
Por padrão, a pasta é criada na raiz do Google Drive. Para criar dentro de outra pasta, use o ID da pasta pai:
function getOrCreateFolder(folderName) {
var parentFolderId = 'COLE_AQUI_O_ID_DA_PASTA_PAI';
var parentFolder = DriveApp.getFolderById(parentFolderId);
var folders = parentFolder.getFoldersByName(folderName);
if (folders.hasNext()) {
return folders.next();
} else {
return parentFolder.createFolder(folderName);
}
}

text

---

## 💡 Exemplo de uso

1. Cole um link do Google Drive na coluna C da sua planilha.
2. O script detecta a edição e cria automaticamente uma cópia do arquivo na pasta configurada.
3. Um aviso de sucesso aparece na planilha.

---

## ❓ FAQ

- **Funciona com quais tipos de arquivos?**
  - Google Drive, Docs, Sheets, Slides, PDFs, imagens, etc.
- **Funciona com links externos?**
  - Não. Apenas arquivos do Google Drive.
- **Funciona com pastas?**
  - Não. Apenas arquivos individuais.
- **Preciso de permissão no arquivo?**
  - Sim, o script só copia arquivos que você tem permissão de acesso.

---

## 📚 Referências

- [Documentação oficial de gatilhos do Apps Script (pt-BR)](https://developers.google.com/apps-script/guides/triggers?hl=pt-br)
- [Exemplo de projetos Apps Script no GitHub](https://github.com/googleworkspace/apps-script-samples)

---

## 📝 Licença

MIT

---

## 👥 Contribuição

Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar pull requests!
