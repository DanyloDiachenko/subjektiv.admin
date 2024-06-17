# Capitalize the first letter of the input string
firstChar=$(echo "$1" | cut -c1 | tr '[:lower:]' '[:upper:]')
restOfString=$(echo "$1" | cut -c2-)
capitalizedString="$firstChar$restOfString"

# Define color variables
BLUE='\033[0;34m'
DEFAULT='\033[0m'

echo -e "Generating API client for common-dto/${BLUE}$1/$capitalizedString${DEFAULT}Api.ts"
npx openapi --input ./spec.json --output src/submodules/common-dto/api-client/"$1" --name "$capitalizedString"Api --client fetch --useOptions --exportCore false || exit 1

(
  cd src/submodules/common-dto/api-client &&
  bash fix-core-location.sh "$1" && (
    cd - || (
      echo -e "${RED}Failed to return to the previous directory! Exiting...${DEFAULT}" &&
      exit 1
    )
  )
)
