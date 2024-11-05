module.exports = {
  apps: [
    {
      name: "hyperflex",
      script: "npm",
      args: "start",
      cwd: "./",
      watch: true,
      ignore_watch: ["node_modules", ".next/cache", ".next/cache/**"],
    },
  ],
};