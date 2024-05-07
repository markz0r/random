# random

## mc-github-contentify.js
- Add to wordpress header.php along with include for EnlighterJS:
```html
	<head>

		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" >

		<link rel="profile" href="https://gmpg.org/xfn/11">
		<link rel="stylesheet" href="https://mwclearning.com/mc-content/EnlighterJS-3.4.0/dist/enlighterjs.min.css" />
		<script type="text/javascript" src="https://mwclearning.com/mc-content/mc-github-contentify.js"></script>
		<script type="text/javascript" src="https://mwclearning.com/mc-content/EnlighterJS-3.4.0/dist/enlighterjs.min.js"></script>

		<?php wp_head(); ?>

	</head>
```
- HTML blocks with `RAW_` prefix placeholder will be replaced with the content of the file from the github repository or the following content. E.g.:
```html
    <div style="max-width:180rem;">
        RAW_https://raw.githubusercontent.com/zoak-solutions/AzureVirtualSAW/master/scripts/AddMembersToGroup.ps1
    </div>
```
or 
```html
    <div class='RAW_PSOutut1>
        # Install .NET SDK
        winget install Microsoft.DotNet.SDK.8
        Found Microsoft .NET SDK 8.0 [Microsoft.DotNet.SDK.8] Version 8.0.204
        dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
        dotnet new install Microsoft.PowerShell.Standard.Module.Template
        # Create a new module project
        mkdir myPSModule; cd .\myPSModule
        dotnet new psmodule
    </div>
```
