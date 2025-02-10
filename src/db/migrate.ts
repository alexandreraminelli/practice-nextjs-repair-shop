import { db } from "./index" // conexão com o db
import { migrate } from "drizzle-orm/neon-http/migrator"

/**
 * Função principal do arquivo de migração.
 *
 * Executa a migração do banco de dados com base nas migrações presentes na pasta `src/db/migrate`.
 * Se a migra o falhar, exibe uma mensagem de erro e o código de saída 1.
 */
const main = async () => {
  try {
    // Tenta executar a migração do banco de dados
    await migrate(db, { migrationsFolder: "src/db/migrations" })
    // Exibe uma mensagem de sucesso se a migração for concluída
    console.log("Migration completed")
  } catch (error) {
    // Tratamento de erros: exibe uma mensagem de erro e encerra o processo com código de saída 1
    console.error("Error during migration: ", error)
    process.exit(1)
  }
}

// Executar a função principal do arquivo
main()
