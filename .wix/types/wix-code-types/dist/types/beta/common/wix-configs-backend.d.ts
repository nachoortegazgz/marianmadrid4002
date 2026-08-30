declare module "wix-configs-backend" {
  function getConfig(packageName: string, configName: string, { basePath }?: {
      basePath?: string | undefined;
  }): Promise<unknown>;
  function getPackageConfig(configName: string, { basePath }?: {
      basePath?: string;
  }): Promise<unknown>;
  //# sourceMappingURL=get-config.d.ts.map
  
  const wixConfigsBackend: {
      getConfig: typeof getConfig;
      getPackageConfig: typeof getPackageConfig;
  };
  //# sourceMappingURL=index.d.ts.map
  
  export { wixConfigsBackend as default };
}
