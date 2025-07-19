# Stage 1: Build React App
FROM node:20 as react-build
WORKDIR /app
COPY ./ClientApp /app
WORKDIR /app
RUN npm install
RUN npm run build

# Stage 2: Build .NET API
FROM mcr.microsoft.com/dotnet/sdk:8.0.405 AS build
WORKDIR /src
COPY *.sln ./
COPY ERPSystem.API.csproj ./
COPY *.json ./
COPY NuGet.Config ./
RUN dotnet restore
COPY . ./
RUN dotnet publish -c Release -o /app

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
COPY --from=react-build /app/build /wwwroot
ENTRYPOINT ["dotnet", "ERPSystem.API.dll"]