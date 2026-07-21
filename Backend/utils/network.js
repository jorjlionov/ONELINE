import os from 'os'

export function getLocalIP() {
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }

    return 'localhost';
}

export function printStartupInfo(port, localIP, mediaDir) {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 Сервер ONELINE запущен!');
  console.log('='.repeat(50));
  console.log(`📡 Локальный:    http://localhost:${port}`);
  console.log(`🌐 Сетевой:      http://${localIP}:${port}`);
  console.log(`📁 Медиа:        ${mediaDir}`);
  console.log('='.repeat(50));
  console.log(`\n💡 Другие устройства: http://${localIP}:${port}\n`);
}