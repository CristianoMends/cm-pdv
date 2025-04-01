package com.api.pdv.docs;

import com.api.pdv.dto.file.FileDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@SecurityRequirement(name = "BearerAuth")
@Tag(name = "File Controller", description = "Endpoints para upload e download de arquivos de imagem")
public interface FileDoc {

    @Operation(
            summary = "Upload de arquivo de imagem",
            description = "Realiza o upload de um arquivo de imagem (JPEG, PNG, GIF) para o sistema.",
            security = @SecurityRequirement(name = "Bearer")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Arquivo enviado com sucesso.", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Parâmetros inválidos ou tipo de arquivo não permitido.", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Diretório de upload não encontrado.", content = @Content()),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor.", content = @Content())
    })
    ResponseEntity<FileDto> uploadFile(MultipartFile file) throws IOException;

    @Operation(
            summary = "Exibir arquivo de imagem",
            description = "Permite visualizar um arquivo de imagem previamente enviado no sistema.",
            security = @SecurityRequirement(name = "Bearer")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Arquivo encontrado e enviado.", content = @Content(mediaType = "image/jpeg")),
            @ApiResponse(responseCode = "200", description = "Arquivo encontrado e enviado.", content = @Content(mediaType = "image/png")),
            @ApiResponse(responseCode = "200", description = "Arquivo encontrado e enviado.", content = @Content(mediaType = "image/gif")),
            @ApiResponse(responseCode = "404", description = "Arquivo não encontrado.", content = @Content()),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor.", content = @Content())
    })
    ResponseEntity<byte[]> downloadFile(String fileName) throws IOException;

}
