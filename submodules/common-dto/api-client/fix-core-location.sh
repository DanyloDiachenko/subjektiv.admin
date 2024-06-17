platform=$(uname -s) # expected Linux or Darwin

# Define color variables
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
DEFAULT='\033[0m'

echo -e "💡 Fixing import paths in the generated files to match the static location of the core module at common-dto/api-client/core"

if [ "$platform" = "Darwin" ]; then
  echo -e "💡 Running on ${GREEN}$platform${DEFAULT} 🍎"
elif [ "$platform" = "Linux" ]; then
  echo -e "💡 Running on ${GREEN}$platform${DEFAULT} 🐧"
else
  echo -e "- ❌ ${RED} Unsupported platform: ${GREEN}$platform! Exiting...${DEFAULT}"
  exit 1
fi

echo -e "- Entering ${BLUE}$1${DEFAULT} folder..."
cd "$1" || (echo -e "❌ ${RED}Folder $1 not found! Exiting...${DEFAULT}" && exit 1)

echo "- - Do replace..."
if [ "$platform" == "Linux" ]; then
  for f in *.ts; do
    sed -i "s%'./core/%'../core/%g" "$f"
  done
elif [ "$platform" == "Darwin" ]; then
  for f in *.ts; do
    find . -name "$f" -exec sed -i '' 's%'./core/%'../core/%g' {} \;
  done
fi
echo "- - done ✔"

services_folder="services"

echo -e "- Entering ${BLUE}$services_folder${DEFAULT} folder..."
cd $services_folder || (echo -e "❌ ${RED}Folder $services_folder not found! Exiting...${DEFAULT}" && exit 1)

echo "- - Do replace..."
if [ "$platform" == "Linux" ]; then
  for f in *.ts; do
    sed -i "s%'../core/%'../../core/%g" "$f"
  done
elif [ "$platform" == "Darwin" ]; then
  for f in *.ts; do
    find . -name "$f" -exec sed -i '' 's%'../core/%'../../core/%g' {} \;
  done
fi

echo "- - done ✔"

echo -e "\033[1m✔ Done!\033[0m"
