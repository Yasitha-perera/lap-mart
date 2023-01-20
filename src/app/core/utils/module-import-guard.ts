export function throwIfAlreadyLoaded
(parentModule:any, moduleName:string)
{
  if (parentModule)
  {
    throw new Error
    (`${moduleName} has already been loaded. Import Core
    Module in the AppModule only.`
    );
  }
}
