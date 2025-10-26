
const fs = require('fs');
const path = require('path');

function ensure(p){ if(!fs.existsSync(p)) fs.mkdirSync(p, {recursive:true}); }
function cp(src, dst){
  if(!fs.existsSync(src)) return;
  ensure(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

const root = process.cwd();
const map = [
  ['layout.tsx', 'app/layout.tsx'],
  ['globals.css', 'app/globals.css'],
  ['index_page.tsx', 'app/page.tsx'],
  ['login_page.tsx', 'app/login/page.tsx'],
  ['pricing_page.tsx', 'app/pricing/page.tsx'],
  ['app_page.tsx', 'app/app/page.tsx'],
  ['auth_config.ts', 'src/lib/auth.ts'],
  ['stripe_api.ts', 'src/lib/stripe.ts'],
  ['i18n.ts', 'src/lib/i18n.ts'],
  ['prisma_client.ts', 'src/lib/prisma.ts'],
  ['schema.prisma', 'prisma/schema.prisma'],
  ['nextauth_route.ts', 'app/api/auth/[...nextauth]/route.ts'],
  ['stripe_checkout_route.ts', 'app/api/stripe/checkout/route.ts'],
  ['stripe_webhook_route.ts', 'app/api/stripe/webhook/route.ts'],
];

for (const [src, dst] of map){
  const s = path.join(root, src);
  const d = path.join(root, dst);
  cp(s, d);
}

// create a minimal tsconfig if missing (for Next paths)
const tsconfig = path.join(root, 'tsconfig.json');
if (!fs.existsSync(tsconfig)){
  fs.writeFileSync(tsconfig, JSON.stringify({
    "compilerOptions": {
      "target": "ES2020",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": false,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "baseUrl": ".",
      "paths": {"@/*": ["./src/*"]}
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  }, null, 2));
}
